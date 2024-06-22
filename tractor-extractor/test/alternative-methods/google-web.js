import { parseHTML } from "linkedom";
const chrono = require("chrono-node");
// import fetch from "$lib/fetch";

/**
 * uses Node fetch Google for a given search term, 
 *
 * @param {object} page - pass in created page object
 * @param {object} searchParams - search parameters
 * @return {Object} results  [ { title, url, date, snippet   }]
 * @throws {Error} If no search results are found or bot detected
 */
export default async function fetchGoogleWeb (searchParams) {
  var { searchTerm } = searchParams;

  const url = "https://www.google.com/search?q=" + searchTerm;

  var html = await (await fetch(url)).text();


  if (html.includes("Our systems have detected unusual traffic"))
    throw new Error("Google blocked search requests, bot detected.");

  const { document } = parseHTML(html);

  console.log(document.body.textContent);

  // get results which are <a href> elements with <h3> children
  var results = document.querySelectorAll("a[href]:has(h3)")?.map((e) => {
    var title = e
      .querySelector("h3")
      //remove missing <?> chars common in snippets
      .textContent.replace(/[\u{0080}-\u{10FFFF}]/gu, "");

    var parent = e.parentNode.parentNode.parentNode;

    //get date if available in div>span element
    var date;
    parent.querySelectorAll("div>span")?.forEach((e) => {
      if (chrono.parseDate(e.textContent))
        date = chrono.parseDate(e.textContent).toISOString().split("T")[0];
    });

    //find snippet in element containing span+span, get its text node
    var snippetDiv = parent.querySelector("span+span")?.parentNode?.childNodes;
    if (snippetDiv)
      var snippet = Array.from(snippetDiv)
        .find((n) => n.nodeType == 3)
        ?.textContent //isolate text node
        ?.replace(/\.\.\./g, "") //remove ...
        ?.replace(/[\u{0080}-\u{10FFFF}]/gu, "")
        .trim(); //remove missing <?> chars common in snippets

    //get url from href, remove google tracking
    var url = e.getAttribute("href");
    if (url && url.indexOf("/url?q") > -1)
      url = new URLSearchParams(url.slice(5)).get("q");

    return {
      title,
      url,
      date,
      snippet,
    };
  });


  return results;
};