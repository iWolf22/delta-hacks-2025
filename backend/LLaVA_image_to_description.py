from groq import Groq
from PIL import Image
from dotenv import load_dotenv
import base64
import io
import sys
import os

load_dotenv()

def encode_image_to_base64(image_path):
    with Image.open(image_path) as image:
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        # Create a bytes buffer
        buffer = io.BytesIO()
        # Save image to buffer in PNG format
        image.save(buffer, format='PNG')
        # Get base64 string
        return base64.b64encode(buffer.getvalue()).decode('utf-8')

def process_image(image_path):
    try:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        client = Groq(api_key=api_key)

        # Encode image to base64
        base64_image = encode_image_to_base64(image_path)
        
        # Prepare the chat message with image
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe this image in detail."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{base64_image}"
                        }
                    }
                ]
            }
        ]

        # Make API call to Groq
        response = client.chat.completions.create(
            model="llava-v1.5-7b-groq",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error processing image: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python image_to_text.py <path_to_image>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = process_image(image_path)
    print("Image Description:", result)