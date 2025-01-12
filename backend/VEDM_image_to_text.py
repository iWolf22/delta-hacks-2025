from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from PIL import Image
import sys

def process_image(image_path):
    try:
        # Load the pre-trained model and processors
        model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
        image_processor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
        tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

        # Load and process image
        image = Image.open(image_path)
        pixel_values = image_processor(image, return_tensors="pt").pixel_values

        # Generate caption
        output_ids = model.generate(pixel_values, max_length=16, num_beams=4)
        caption = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        
        return caption
    except Exception as e:
        return f"Error processing image: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python image_to_text.py <path_to_image>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = process_image(image_path)
    print("Image Description:", result)
