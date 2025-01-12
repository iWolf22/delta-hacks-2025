from item_extraction import get_shopping_list
from product_scrape import get_shopping_options
import json


def process_event_request(event_description):
    """
    Process an event description and return product recommendations
    """
    try:
        # Step 1: Extract shopping list from description
        shopping_list = get_shopping_list(event_description)
        print("\nExtracted shopping list:")
        print(shopping_list)
        
        # Step 2: Get product options for each item
        product_options = get_shopping_options(shopping_list)
        
        return product_options
        
    except Exception as e:
        return {"error": str(e)}

# Test the implementation
if __name__ == "__main__":
    test_description = """
    I'm planning a Minion-themed birthday party for 20 kids. 
    We need decorations, party favors, and some snacks. 
    The party will be indoors and last for 3 hours.
    """
    
    print("Processing event request...")
    results = process_event_request(test_description)
    print("\nProduct recommendations:")
    print(json.dumps(json.loads(results), indent=2))