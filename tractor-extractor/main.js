import invokeModel from "./aws.js";
import process from "./you-search.js";

// Call the function with a query parameter

const SummaryAgentPrompt = 
`You are an AI agent for disaster response management and your
role is to give users helpful, realtime information about disasters.
Give them a summary of where to go for food, shelter, and how
to contact emergency response.

1. **Personal Safety:**
   - What should I do to stay safe right now?
   - Are there any immediate dangers I need to be aware of?
   - Where are the nearest shelters or safe locations?
2. **Emergency Assistance:**
   - How can I get help or emergency services?
   - Where can I find food, water, and medical assistance?
   - Is there any assistance available for those who are injured or ill?
3. **Communication:**
   - How can I contact my family and friends?
   - Is there a way to charge my phone or access the internet?
   - Are there any official channels providing updates and information?
4. **Reunification and Missing Persons:**
   - How can I find my family members or friends who might be missing?
   - Is there a central place to report missing persons?
   - What steps should I take if I find someone who is separated from their family?


I need a summary of the news on the topic`;



async function main(searchTerms) {
  var data = await process(searchTerms, { limit: 6 });
  var extractionString = JSON.stringify(data, null, 2);

//   console.log(extractionString);

  var queryString =
    SummaryAgentPrompt +
    // searchTerms +
    "NEWS: " +
    extractionString;

  var response = await invokeModel(queryString);

  response = response?.output.messsage?.content[0]?.text;

  return response;
}

var query = "new mexico wildfires";

var response = await main(query);

console.log(response);