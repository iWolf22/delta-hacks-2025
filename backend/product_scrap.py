from exa_py import Exa
from dotenv import load_dotenv
import os
import json
from cohere import Client
import re 
from urllib.parse import urlparse

# Load environment variables
load_dotenv()


# Initialize Exa client
exa_client = Exa(api_key=os.getenv('EXA_API_KEY'))


def extract_domain(url):
    # Extract the netloc (domain) from the URL
    parsed_url = urlparse(url)
    domain = parsed_url.netloc

    if domain.startswith("www."):
        domain = domain[4:]
    
    domain = domain.split('.')[0].capitalize()
    return domain


def extract_price(text):
    # Look for $ followed by up to 4 digits/decimal points
    match = re.search(r'\$(\d+\.?\d{0,2})', text)
    if match:
        # Get the number without the $ and pad with zeros if needed
        price = match.group(1)
        # If there's no decimal point, add .00
        if '.' not in price:
            price = price + '.00'
        # If there's one decimal place, add a 0
        elif price.count('.') == 1 and len(price.split('.')[1]) == 1:
            price = price + '0'
        return price
    return '0.00'

    # prompt = f"""Extract the dollar ($) price from the following text:
    # "{text}"
    # Rules:
    # - There might be multiple prices but only select one price value. 
    # - Only provide the decimal value of a single price. 
    # - Do not include the dollar sign."""
    # # Generate the response
    # response = co.generate(
    #     model='command-xlarge',  # Use an appropriate Cohere model
    #     prompt=prompt,
    #     max_tokens=10,
    #     temperature=0.3  # Low temperature for consistent results
    # )
    # # Extract and print the current price
    # price = response.generations[0].text.strip()
    return price

def search_products(item_name, num_results=1):
    """
    Search for products using Exa.ai and return structured product information
    """
    try:
        # Construct search query
        query = f"Here is a direct product page for an individual listing for shopping one {item_name}"
        
        # Search using Exa
        search_results = exa_client.search_and_contents(
            query,
            summary={
                "query": "Provide a very brief description of the product"
            },
            text={
                "max_characters": 1000
            },         
            num_results=num_results,
            use_autoprompt=True,
            type="auto",
            include_text=["$"],
            extras={
                "image_links": 1,
            }
        )

        # Process and structure the results
        products = []
        for result in search_results.results:
            product = {
                "name": result.title,
                "description": result.summary,
                "brand": extract_domain(result.url),
                "sourceUrl": result.url,
                "price": extract_price(result.text),
                "image": result.image if result.image else result.favicon,
            }
            products.append(product)

        return products

    except Exception as e:
        print(f"Error searching for {item_name}: {str(e)}")
        return []

def get_shopping_options(shopping_list):
    """
    Process the shopping list and find product options for each item
    """
    try:
        # # Parse the shopping list JSON
        # shopping_list = json.loads(shopping_list_json)
        
        # Store results for all items
        product_list = []
        
        # Iterate through categories and items
        for item in shopping_list:
            # Search for products for each item
            product_list.extend(search_products(item))
        
        return json.dumps(product_list, indent=2)

    except Exception as e:
        print(f"Error processing shopping list: {str(e)}")
        return json.dumps({"error": str(e)})
    
# Test code
if __name__ == "__main__":
    test_list = ['minion themed party pack', 'blue balloons', 'minion cake', 
                 'despicable me cupcakes', 'yellow party treats', 'minion toys', 
                 'kids tablecloth', 'blue streamers']
    results = get_shopping_options(test_list)
    print(results)

    #print(extract_domain("https://www.ebay.com/itm/164141157797"))