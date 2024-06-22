// import { HttpProxyAgent, HttpsProxyAgent } from "hpagent";
//try with pure http https and bun doesnt work
import fetch from "node-fetch";


/**
 * Scrapes any url to return html or pdf,
 * error if bot detection
 * @param {string} url url of any webpage
 * @returns html
 */
export default async function fetchText(url) {

  const headers = {
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
  };

  var response = await fetch(url, { headers });

  if (!response.ok) {
    console.error("Fetch error", response.statusText, url);
    return "";
  }

  //check for bot detection
  if (checkBotDetected(response)) {
    console.error("Bot detected", url);
    //TODO
    
    return ""
    await fetchViaProxy(url);
  }

  response = await response.text();

  return response;
}

//check html for bot block messages
function checkBotDetected(html) {
  if (!html || !html.includes) return false;
  var commonBlockMessages =
    "Cloudflare Ray ID|Before you continue to Google|Please verify you are a human" +
    "|Sorry, we just need to make sure you're not a robot|Access to this page has been denied" +
    "|Please make sure your browser supports JavaScript|Please complete the security check to access";

  return commonBlockMessages.split("|").filter((msg) => html.indexOf(msg)>-1).length > 0
}

//when using scrapoxy, disable "Intercept HTTPS requests"

/**
 * Scrapes a url for html content, optionally using proxy
 * @param {string} url url to fetch, supports http and https
 * @returns {string} html content of the url
 */
async function fetchViaProxy(url) {
  var agent = null,
    requestHandler;

  var proxyUrl = proxy + "?url=" + url;

  var res = await (await fetch(url, { agent })).text();

  return res;
}
