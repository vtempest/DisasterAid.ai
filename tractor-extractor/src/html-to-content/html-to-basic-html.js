import convertHTMLToTokens from "./html-to-tokens";

/**
 * Strip HTML to basic markup HTML tags, lists, tables, images.
 * Convert anchors and relative urls to absolute urls.
 *
 * @param {string} html
 * @param {object} options {images: 0, links: 1, sections: 1, formatting: 1 }
 * @returns {string} sanitized html
 */
export default function convertHTMLToBasicHTML(html, options) {
  var {
    images = 1,
    links = 1,
    formatting = 1,
    absoluteURLs = 1,
    url = 0,
    allowedTags =
    "br,p,u,b,i,em,strong,h1,h2,h3,h4,h5,h6,blockquote," +
    "small,pre,code,label,ul,ol,li,dd,dl," +
    "table,th,tr,td,thead,tbody,tfood",
  } = options;

  allowedTags = allowedTags.split(",");
  if (links) allowedTags.push("a");
  if (images) allowedTags.push("img");

  if (!formatting) allowedTags = ["text"];
  allowedTags.push("text");

  var allowedAttributes = ["text", "tag", "href", "src"];

  // [{tag:"p",attr},{text}]
  var basicHtml = convertHTMLToTokens(html)
    .filter(
      (token) =>
        token.text ||
        (token.tag[0] == "/"
          ? allowedTags.includes(token.tag?.substring(1))
          : allowedTags.includes(token.tag))
    )
    .map((el) => {
      for (var key of Object.keys(el))
        if (!allowedAttributes.includes(key)) delete el[key];

      //convert relative urls to absolute urls
      var urlValue = el.href; //|| el.src;
      if (absoluteURLs && urlValue) {
        if (urlValue.startsWith("//")) urlValue = "https:" + urlValue;

        if (urlValue[0] == "#") urlValue = url + urlValue;
        try {
          if (urlValue[0] == "/") urlValue = new URL(url).origin + urlValue;
        } catch (e) {}

        if (el.href) el.href = urlValue;
        if (el.src) el.src = urlValue;
      }

      return el;
    })
    .reduce((acc, el) => {
      if (el.text) acc += `${el.text}`;
      else if (el.tag)
        acc += `<${el.tag}${Object.keys(el)
          .filter((key) => key != "tag")
          .map((key) => " " + key + '="' + el[key] + '"')
          .join(" ")}>`;
      return acc;
    }, "")
    .replace(/[\u0300-\u036f]/g, "") //special chars
    .replace(/ \s+/g, " ")
    .replace(/<p><\/p>/g, " ")
    .replace(/[\r\n\t]+/g, " "); //remove linebreaks

  return basicHtml;
}
