### DisasterAid.AI

## Berkeley AI Hackathon 2024 - AWS Climate Tech Award

[Berkeley Hackathon Video - AWS Climate Tech Award ](https://youtu.be/tsTeEkzO9xc?si=gQt6Gea8pkXqY7Ru&t=4845)

### Inspiration
The increasing frequency and severity of natural disasters such as wildfires, floods, and hurricanes have created a pressing need for reliable, real-time information. Families, NGOs, emergency first responders, and government agencies often struggle to access trustworthy updates quickly, leading to delays in response and aid. Inspired by the need to streamline and verify information during crises, we developed Disasteraid.ai to provide concise, accurate, and timely updates.

### What it does
Disasteraid.ai is an AI-powered platform consolidating trustworthy live updates about ongoing crises and packages them into summarized info-bites. Users can ask specific questions about crises like the New Mexico Wildfires and Floods to gain detailed insights. The platform also features an interactive map with pin drops indicating the precise coordinates of events, enhancing situational awareness for families, NGOs, emergency first responders, and government agencies.

### How we built it
Data Collection: We queried You.com to gather URLs and data on the latest developments concerning specific crises.
Information Extraction: We extracted critical information from these sources and combined it with data gathered through Retrieval-Augmented Generation (RAG).
AI Processing: The compiled information was input into Anthropic AI's Claude 3.5 model.
Output Generation: The AI model produced concise summaries and answers to user queries, alongside generating pin drops on the map to indicate event locations.
###  Challenges we ran into
Data Verification: Ensuring the accuracy and trustworthiness of the data collected from multiple sources was a significant challenge.
Real-Time Processing: Developing a system capable of processing and summarizing information in real-time requires sophisticated algorithms and infrastructure.
User Interface: Creating an intuitive and user-friendly interface that allows users to easily access and interpret information presented by the platform.
Accomplishments that we're proud of
Accurate Summarization: Successfully integrating AI to produce reliable and concise summaries of complex crisis situations.
Interactive Mapping: Developing a dynamic map feature that provides real-time location data, enhancing the usability and utility of the platform.
Broad Utility: Creating a versatile tool that serves diverse user groups, from families seeking safety information to emergency responders coordinating relief efforts.
### What we learned
Importance of Reliable Data: The critical need for accurate, real-time data in disaster management and the complexities involved in verifying information from various sources.
AI Capabilities: The potential and limitations of AI in processing and summarizing vast amounts of information quickly and accurately.
User Needs: Insights into the specific needs of different user groups during a crisis, allowing us to tailor our platform to better serve these needs.
What's next for DisasterAid.ai
Enhanced Data Sources: Expanding our data sources to include more real-time feeds and integrating social media analytics for even faster updates.
Advanced AI Models: Continuously improving our AI models to enhance the accuracy and depth of our summaries and responses.
User Feedback Integration: Implementing feedback loops to gather user input and refine the platform's functionality and user interface.
Partnerships: Building partnerships with more emergency services and NGOs to broaden the reach and impact of Disasteraid.ai.
Scalability: Scaling our infrastructure to handle larger volumes of data and more simultaneous users during large-scale crises.



### About
DisasterAid.ai, a generative AI-powered platform that acts as an interactive chatbot. Inspired by the urgent need for dependable, real-time information during natural disasters, we developed a tool that enables users to ask specific questions about ongoing crises and receive timely, accurate updates. Our platform leverages the latest AI model Anthropic's Claude 3.5 Sonnet through Amazon Bedrock and employs a Retrieval-Augmented Generation (RAG) model to provide accurate and concise summaries. We also incorporate the latest real-time news about the crisis, ensuring users have access to the most current updates through You.com API, an LLM with access to real-time knowledge.

DisasterAid.ai features an interactive map with real-time pin drops, utilizing Mapbox and Google Maps, to indicate the precise coordinates of events. This enhances situational awareness for families, NGOs, emergency responders, and government agencies. The platform collects and verifies data from multiple authoritative sources, such as FEMA and other official bodies, ensuring trustworthy updates.

We faced challenges in data verification, real-time processing, and creating an intuitive user interface, but our team’s dedication led to a successful project that has the potential to save lives and streamline disaster response efforts.
In critical situations, timely and accurate information can make a significant difference. Our AI-driven Customer Support Chatbot is specifically designed to provide crucial information during emergencies and to send timely alerts and safety instructions, ensuring rapid response and heightened safety for all involved.

### Features
Prompt Delivery of Critical Information During Emergencies¶
Be Prepared, Stay Informed:
In an emergency, every second counts. Our chatbot acts swiftly to provide essential information, helping individuals make informed decisions and stay safe.

🆘 Instant Emergency Updates: The chatbot delivers real-time information during emergencies, keeping users informed about the situation as it unfolds.
🔍 Accurate Information Source: Drawing from verified sources, the chatbot ensures that the information provided is both current and accurate, avoiding the spread of misinformation.
📡 Wide Reach and Accessibility: Capable of reaching a broad audience quickly, the chatbot disseminates critical information efficiently, ensuring maximum reach.
Sending Alerts and Safety Instructions As Needed¶
Safety First, Always Informed:
Our AI chatbot not only informs but also guides. It sends out alerts and provides clear, concise safety instructions tailored to the nature and severity of the emergency, aiding in effective and timely response actions.

🚨 Timely Alerts: Whether it's a natural disaster, health crisis, or other emergencies, the chatbot sends out prompt alerts to users, helping them stay one step ahead.
🛑 Clear Safety Instructions: Based on the type of emergency, the chatbot offers specific safety instructions, guiding users on the best course of action.
🔄 Continuous Updates: As situations evolve, the chatbot provides ongoing updates and instructions, ensuring users have the latest information for their safety.
Why Our AI Customer Support Chatbot Is Essential in Emergency Response

Rapid Response Capability: Enables quick dissemination of critical information, helping to reduce panic and confusion in emergency situations.
Reliable Information Source: Offers a trustworthy source of information, preventing the spread of rumors and misinformation.
Enhanced Public Safety: By providing accurate alerts and safety instructions, the chatbot plays a crucial role in public safety and emergency preparedness.

### Installation

`docker run -d -p 27017:27017 --name mongo-chatui mongo:latest`

yarn
`yarn add sharp --ignore-engines`

npm install --unsafe-perm
npm install sharp --ignore-scripts
