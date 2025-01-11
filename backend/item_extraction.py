from langchain_community.llms import Cohere
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Use API key from environment
llm = Cohere(temperature=0, cohere_api_key=os.getenv('COHERE_API_KEY'))

# Define the prompt for the model with a simpler template
prompt = PromptTemplate(
    input_variables=["event_description"],
    template=(
        "Extract a detailed shopping list from the following event description.\n\n"
        "Event Description: {event_description}\n\n"
        "Format your response as a JSON array of specific item names.\n"
        "Make item names specific but concise (e.g., 'blue balloons' instead of just 'balloons').\n"
        "Do not include prices or quantities.\n"
    )
)

chain = LLMChain(llm=llm, prompt=prompt)

def get_product_options(shopping_list):
    """
    Get product options for each item in the shopping list
    """
    try:
        # Parse the shopping list if it's a string
        if isinstance(shopping_list, str):
            items = json.loads(shopping_list)
        else:
            items = shopping_list
            
        # Get product options for each item
        product_options = {}
        for item in items:
            product_options[item] = search_products(item)
            
        return product_options
    except Exception as e:
        print(f"Error getting product options: {str(e)}")
        return {}

# Example usage
event_description = "A Minion-themed kids' birthday party is a vibrant, playful celebration filled with cheerful yellow and blue hues reminiscent of the beloved characters from Despicable Me. The decorations feature Minion balloons, banners, and tableware adorned with their goofy expressions and iconic overalls. Tables are topped with yellow tablecloths and centerpieces crafted from banana bunches, paying homage to the Minions' favorite treat. "
shopping_list = chain.run(event_description)
print(shopping_list)
