from flask import Flask, jsonify, request

from flask_cors import CORS
import json

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": "http://localhost:3000",
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
        }
    },
)


@app.route("/products")
def get_products():
    with open("products.json", "r") as f:
        products = json.load(f)
    return jsonify(products)


@app.route("/upload-pictures", methods=["POST"])
def upload_pictures():

    data = request.get_json()

    with open("lines.txt", "r") as file:
        num = file.read()

        with open("lines.txt", "w") as file:
            file.write(str(len(data["pictures"])))

        # list of base64 picture strings
        pictures = data["pictures"][int(num) :]

        # your code
        print(pictures)

    return jsonify({"hello": "world"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
