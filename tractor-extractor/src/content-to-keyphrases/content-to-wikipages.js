import sbd from "sbd";
import nlp from "compromise";
import nlpWikipedia from "node_modules/compromise-wikipedia/builds/compromise-wikipedia";
// default import throws an error here
// https://github.com/spencermountain/compromise/blob/18db3dadcef0d87beabf71317d0904806355ec52/plugins/wikipedia/src/plugin.js#L1

/**
 * Searches text for wikipedia named entities from list of 38K popular pages
 * returns page titles, match indexes, and count
 * @param {string} text - text to search for wikipedia entities
 * @returns {arrray} [{ title, matchCount, matchIndexes}]
 */
export async function WikiEntityRecognition(text, options = {}) {
  var {
    matchPositions = true,
    limit = 10,
    fetchSummaries = true, //takes long time to fetch 20+
    plainText = false,
    summarySentenceLimit = 3,
  } = options;

  var doc = nlp(text);
  nlp.extend(nlpWikipedia);

  var wikiEntities = doc.wikipedia()
    .json()
    .map((i) => i.text.replace(/[\.\,\[\]\(\)]/g, "").trim());
  wikiEntities = [...new Set(wikiEntities)];

  var wikiEntitiesMatches = [];
  if (matchPositions) {
    for (var title of wikiEntities) {
      if (!title || title.length < 3) continue;
      var matches = Array.from(text.matchAll(title)).map((i) => i.index);

      wikiEntitiesMatches.push({
        text: title,
        matchCount: matches.length,
        matchIndexes: matches,
      });
    }
    wikiEntitiesMatches = wikiEntitiesMatches
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, limit);
  } else {
    wikiEntitiesMatches = wikiEntities.map(i => {
      return { text: i };
    });
  }
  
  if (fetchSummaries) {
    var output = [];

    //get page summary for each entity
    for (var entity of wikiEntitiesMatches) {
      var wikiPage = await searchWikipedia(entity.text, {
        plainText,
        summarySentenceLimit,
      });

      var clone = {};
      Object.assign(clone, entity);
      clone.page = wikiPage;
      output.push(clone);
    }
    wikiEntitiesMatches = output;
  }

  return wikiEntitiesMatches;
}


/**
 * Search Wikipedia for a query, return the first result's title, 
 * summary, and image. Returns {error} if no results found.
 * 
 * @param {string} query 
 * @param {object} options defaults options: 
 *    { plainText = false, summarySentenceLimit = 3, 
 *    limitSearchResults = 1, images = false, imageSize = 200,}
 * @returns {object} {title, summary, image}
 */
export async function searchWikipedia(query, options = {}) {
  var {
    plainText = false,
    summarySentenceLimit = 3,
    limitSearchResults = 1,
    images = true,
    imageSize = 200,
  } = options;

  var url =
    "https://en.wikipedia.org/w/api.php?action=query&gsrlimit=" +
    limitSearchResults +
    "&origin=*&" +
    (plainText ? "explaintext=1&exsectionformat=plain" : "") +
    "&generator=search&exintro=&prop=" +
    (images ? "extracts|pageimages" : "extracts") +
    "&format=json&gsrsearch=" +
    query.replace(/ /g, "%20");

  var info = await (await fetch(url)).json();

  if (!info || !info.query || !Object.keys(info?.query?.pages).length) 
    return {error: "No results found."};

  info = info.query.pages[Object.keys(info.query.pages)[0]];

  
  var pageData = { title: info.title};

  var extract = plainText ? info.extract?.replace(/[\n\r]/g, " ") :
     info.extract?.replace(/<(link|span|\/span)[^>]*>/g, " ").replace(/[\n\r]/g, " ");

  pageData.summary =
    summarySentenceLimit > 0
      ? sbd.sentences(extract).slice(0, summarySentenceLimit).join(" ")
      : extract;

  if (images)
    pageData.image = info.thumbnail
      ? info.thumbnail.source.replace("/50px", "/" + imageSize + "px")
      : null;

  return pageData;
}
