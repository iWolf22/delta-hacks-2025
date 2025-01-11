from exa_py import Exa
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Initialize Exa client
exa_client = Exa(api_key=os.getenv('EXA_API_KEY'))

def search_products(item_name, num_results=3):
    """
    Search for products using Exa.ai and return structured product information
    """
    try:
        # Construct search query
        query = f"shopping {item_name} product details with price"
        
        # Search using Exa
        search_results = exa_client.search(
            query,
            num_results=num_results,
            use_autoprompt=True,
            type="products",
            #category="company"
        )

        # Process and structure the results
        products = []
        for result in search_results:
            product = {
                "name": result.title,
                "price": result.price if hasattr(result, 'price') else None,
                "description": result.snippet,
                "link": result.url,
                "image_url": result.image_url if hasattr(result, 'image_url') else None,
                "site": result.domain
            }
            products.append(product)

        return products

    except Exception as e:
        print(f"Error searching for {item_name}: {str(e)}")
        return []

def get_shopping_options(shopping_list_json):
    """
    Process the shopping list and find product options for each item
    """
    try:
        # Parse the shopping list JSON
        shopping_list = json.loads(shopping_list_json)
        
        # Store results for all items
        product_options = {}
        
        # Iterate through categories and items
        for category, items in shopping_list.items():
            product_options[category] = {}
            for item in items:
                # Search for products for each item
                product_results = search_products(item)
                product_options[category][item] = product_results
        
        return json.dumps(product_options, indent=2)

    except Exception as e:
        print(f"Error processing shopping list: {str(e)}")
        return json.dumps({"error": str(e)})
    