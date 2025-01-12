from groq import Groq
import base64
import os
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
client = Groq()
# Function to encode the image


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def generate_description(base64_image):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Give me a paragraph of specific objects and the theme are in the image.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": base64_image,
                        },
                    },
                ],
            }
        ],
        model="llama-3.2-90b-vision-preview",
    )
    message = chat_completion.choices[0].message.content
    return message


# Test code
if __name__ == "__main__":
    # Test with a single image
    image_path = "/Users/carolinehuang/Documents/deltahacks2025/delta-hacks-2025/backend/minion_party.jpg"
    # Getting the base64 string
    base64_image = encode_image(image_path)
    print(generate_description("base64_image"))
