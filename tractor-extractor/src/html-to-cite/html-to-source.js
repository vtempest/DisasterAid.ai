/**
 * Extract source from document using common class names
 *
 * @param {document} document document or dom object with article content
 * @returns {object} source
 */
export default function extractSource(document) {
  var source, arrSources;

  //Find Publication
  if (typeof source == "undefined") {
    arrSources = document.getElementsByClassName("og:site_name"); //Try og:site_name
    if (arrSources.length <= 0) {
      arrSources = document.getElementsByClassName("cre");
    } //Try cre
    if (arrSources.length <= 0) {
      //If no name tags, loop meta tags instead
      var arrMeta = document.getElementsByTagName("meta");

      for (var i = 0; i < arrMeta.length; i++) {
        if (arrMeta[i].getAttribute("property") == "og:site_name") {
          source = arrMeta[i].content;
        } //Find og:site_name in property attributes
      }
    }
    //If anything found, assign it to Publication
    if (arrSources.length > 0) {
      source = arrSources[0].content;
    }

    //Clean up publication name
    if (typeof source != "undefined") {
      //Strip "The" and "www." from beginning
     
      if (
        source.substring(0, 4) == "www." ||
        source.substring(0, 4) == "WWW."
      ) {
        source = source.slice(4);
      }

      //Strip .Com from end
      if (source.lastIndexOf(".com") != -1)
        source = source.slice(0, source.lastIndexOf(".com"));
      if (source.lastIndexOf(".COM") != -1)
        source = source.slice(0, source.lastIndexOf(".COM"));
      //Trim string
      source = source.trim();
    } else {
    }
  }

  return source;
}

/**
 * Extract title from document using common class names
 *
 * @param {document} document document or dom object with article content
 * @returns {object} title
 */
export function extractTitle(document) {
  var title, arrTitles;

  if (typeof title == "undefined") {
    arrTitles = document.getElementsByClassName("og:title"); //Try og:title
    if (arrTitles.length <= 0) {
      arrTitles = document.getElementsByClassName("DC.title");
    } //Try DC.title
    if (arrTitles.length <= 0) {
      arrTitles = document.getElementsByClassName("headline");
    } //Try headline
    if (arrTitles.length <= 0) {
      //If no name tags, loop meta tags instead
      var arrMeta = document.getElementsByTagName("meta");
      for (var i = 0; i < arrMeta.length; i++) {
        if (arrMeta[i].getAttribute("property") == "og:title") {
          title = arrMeta[i].content;
        } //Find og:title in property attributes
      }
    }

    //If anything found, assign it to Title
    if (typeof arrTitle != "undefined") {
      title = arrTitles[0].content;
    }

    //Worst case, use html title
    if (typeof title == "undefined") {
      title = document.title;
    }

    //Slice off | and -
    if (typeof title != "undefined") {
      if (title.indexOf("|") != -1) {
        title = title.slice(0, title.indexOf("|") - 1);
      } //Slice off trailing |
      if (title.indexOf("--") != -1) {
        title = title.slice(0, title.indexOf("--") - 1);
      } //Slice off trailing --
      if (title.indexOf(" - ") != -1) {
        title = title.slice(0, title.indexOf(" - "));
      } //Slice off trailing -
    }
  }

  return title;
}
