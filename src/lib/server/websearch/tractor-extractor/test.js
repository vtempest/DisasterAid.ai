import { Actor } from "apify";
import { PuppeteerCrawler } from "crawlee";

await Actor.init();

const crawler = new PuppeteerCrawler({
  async requestHandler({ request, enqueueLinks }) {
    console.log(request.url);
    
    // Add all links from page to RequestQueue
    await enqueueLinks();
  },
  maxRequestsPerCrawl: 10, 
});

var query = "New Mexico wildfires";

var url =
  "https://x.com/search?q=" +
  query.replace(/ /g, "%20") +
  "&src=typeahead_click&f=live";

// Run the crawler
await crawler.run([url]);

await Actor.exit();
