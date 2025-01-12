from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/products')
def get_products():
    with open('products.json', 'r') as f:
        products = json.load(f)
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
