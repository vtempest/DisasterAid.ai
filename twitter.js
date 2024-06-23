import { parseHTML } from "linkedom";
import fetch from "node-fetch";

async function getTwitterNews(query) {
  var url =
    "https://x.com/search?q=" +
    query.replace(/ /g, "%20") +
    "&src=typeahead_click&f=live";


  var response = await fetch(url);
  var html = await response.text();

    var tweets = [];


}

var query = "New Mexico wildfires";

await getTwitterNews(query);
