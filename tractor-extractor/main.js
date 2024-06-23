import invokeModel from "./aws.js";
import process from "./you-search.js";

// Call the function with a query parameter

import {SummaryAgentPrompt, RespondersData} from "./prompts.js"

async function main(searchTerms) {
  var data = await process(searchTerms, { limit: 6 });
  var extractionString = JSON.stringify(data, null, 2);

//   console.log(extractionString);

  var queryString =
    RespondersData +
    SummaryAgentPrompt +
    "NEWS: " +
    extractionString;

  var response = await invokeModel(queryString);

//   console.log(response);
  response = response?.output.message?.content[0]?.text;

  return response;
}

var query = "new mexico wildfires";

var response = await main(query);

console.log(response);