# Party Palette (delta-hacks-2025)

## 🚀 Inspiration
In today’s fast-paced world, finding a sense of community often begins in third spaces—and what better way to foster those connections than by hosting events? The challenge, though, lies in the how. Planning an event can turn into a logistical nightmare—rabbit holes of online searches, endless iterations of shopping lists, and exhausting errands.

We believe hosting should be as imaginative and exciting as the event itself. What if there was a seamless way to bring your creative vision to life and check every item off your list, all in one place? What if event planning felt less like a chore and more like a joy?

That’s where PartyPalette comes in.

## ⚙️ What it does
Party Palette is your ultimate tool for effortless event planning—a creative sandbox where your ideas come alive and logistics practically handle themselves.

- 🎨 Design Your Dream Event: With drag-and-drop simplicity, you can craft a visual palette that captures the vibe, theme, and personality of your event. Whether it’s an elegant masquerade, a cozy backyard picnic, or an epic movie marathon, your palette becomes your creative blueprint.
- 🤝 Collaborate in Real-Time: Planning with friends? Work together on a shared palette in PartyPalette to see each other’s updates live, and create something truly unique as a team. Watch your ideas flow, merge, and take shape in real-time.
- 🛒 Curate Your Perfect Shopping Cart: Say goodbye to endless scrolling and turn inspiration into action. With AI-powered recommendations tailored to your palette, PartyPalette finds everything you need—from decor to supplies to snacks—sourced from the best options across the web.

## 🏗️ How we built it
Our application is built with React and Next.js. For the canvas features, we use Tldraw which provides an intuitive drag-and-drop whiteboard environment. To enable real-time collaboration, we integrate Liveblocks, which manages websockets for multi-user interactions.

The backend is powered by a Python Flask server, which handles API requests and supports an AI-driven cart curation system. Our AI workflow includes:

- Llama Vision 3.2 11B model (on Groq): Translates uploaded images into detailed text descriptions.
- Cohere NLP: Analyzes these descriptions to extract highly specific items needed for the event.
- exa.ai: A neural network-based web search engine that scrapes and identifies the best product options, curating a tailored shopping cart for users.

## ⚒️ Challenges we ran into
- Configuring tldraw to feature our specific requirements
- Understanding why our websockets were not syncing
- Troubleshooting around how our AI models (ie. VisionEncoderDecoderModel and local models) were taking far too long to run
- Making AI agent frameworks like langchain produce predictable results
- Updating data sent to the backend since caches in Liveblocks made it difficult to keep track of what images were being posted

## 💪 Accomplishments that we're proud of
- Integrating complicated libraries like LiveBlocks
- Designing an AI workflow
- Connecting many data requests and transformations
- Finding optimizations and experimenting with different AI models to use
- Be able to capture minute and granular details from photos to influence items in the cart

## 📕 What we learned
- Adding multiplayer support
- How to create a whiteboard
- How to use web scrapers
- What AI models to use in what use case and requirements (latency, computer power, storage)

## 👀 What's next for PartyPalette
- Setting a Budget: Enabling cart recommendations to be tailored to specific budgets
- Location-Based Recommendations: Using location data to minimize shipping costs and support local businesses
- Design Assistant Chatbot: Adding a chatbot offering inspiration, brainstorming ideas, and guiding users through the event planning process Automated Payment: Simplifying the checkout process with one-click payment functionality.

## 🚧 Built With
- cohere
- exa.ai
- figma
- flask
- groq
- liveblocks
- next.js
- react
- tailwind
- tldraw
- vercel
