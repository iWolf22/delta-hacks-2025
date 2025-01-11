from item_extraction import chain
from langchain.agents import Tool, initialize_agent
from langchain.agents import AgentType

# Define scraping tools
def fetch_items(query):
    # Use Playwright or BeautifulSoup here
    return scrape_items(query)

scrape_tool = Tool(
    name="ScrapeEcommerce",
    func=fetch_items,
    description="Scrape e-commerce websites for event items."
)

# Chain setup
agent = initialize_agent(
    tools=[scrape_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Run the agent
event_description = "I'm hosting a wedding with 100 guests. I need flowers, catering, and chairs."
response = agent.run(event_description)
print(response)