import base64
from GROQ_image_to_desc import generate_description
from item_extraction import get_shopping_list
from product_scrap import get_shopping_options
import json

def process_images_to_description(base64_images):
    """Convert multiple base64 images to a combined description"""
    all_descriptions = []
    
    for base64_image in base64_images:
        description = generate_description(base64_image)
        all_descriptions.append(description)
    
    # Combine all descriptions
    return " ".join(all_descriptions)

def generate_shopping_recommendations(base64_images):
    """Main function to process images and generate shopping recommendations"""
    try:
        # Step 1: Generate combined description from images
        combined_description = process_images_to_description(base64_images)
        
        # Step 2: Extract shopping list from description
        shopping_list = get_shopping_list(combined_description)
        
        # Step 3: Get product recommendations for each item
        product_recommendations = get_shopping_options(shopping_list)
        
        return product_recommendations
        
    except Exception as e:
        print(f"Error in generate_shopping_recommendations: {str(e)}")
        return json.dumps({"error": str(e)})

# Test code
if __name__ == "__main__":
    # Test with a single image
    with open("minion_party.jpg", "rb") as image_file:
        test_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    
    results = generate_shopping_recommendations([test_base64])
    print(results)