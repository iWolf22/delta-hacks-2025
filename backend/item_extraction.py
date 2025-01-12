from cohere import Client
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Initialize Cohere client
co = Client(os.getenv('COHERE_API_KEY'))

def get_shopping_list(event_description):
    try:
        prompt = f"""Extract a shopping list from the following event description. Return the items as a list.

Event Description: {event_description}

Rules:
- Make item names specific but concise (e.g., 'blue balloons' instead of 'balloons')
- Do not include prices or quantities
- Format the response EXACTLY like this: ["item1", "item2", "item3"]
"""
        response = co.generate(
            prompt=prompt,
            temperature=0,
            max_tokens=300
        )
        return json.loads(response.generations[0].text)
    except Exception as e:
        print(f"Error parsing response: {str(e)}")
        return []

# Example usage
if __name__ == "__main__":
    #event_description = "A Minion-themed kids' birthday party is a vibrant, playful celebration filled with cheerful yellow and blue hues reminiscent of the beloved characters from Despicable Me. The decorations feature Minion balloons, banners, and tableware adorned with their goofy expressions and iconic overalls. Tables are topped with yellow tablecloths and centerpieces crafted from banana bunches, paying homage to the Minions' favorite treat. "
    event_description = "A Bruno Mars-themed retirement party exudes charisma, style, and a touch of retro glamour, celebrating a lifetime of accomplishments with the smooth vibes of his music. The decor features shimmering gold, deep maroon, and sleek black tones, accented by twinkling lights and disco balls to evoke a concert-like ambiance."
    shopping_list = get_shopping_list(event_description)
    print(shopping_list)
