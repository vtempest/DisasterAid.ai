
/**
 * Convert html string to array of JSON Objects tokens to translate,
 * convert, or filter all elements. Example [{"tag": "img","src": ""}, ...]
 * Flat array is faster than DOMParser which uses nested trees.
 * @param {string} html 
 * @returns {array} 
 */
export default function convertHTMLToTokens(html) {
  if (!html) return;
  var dom = [];

  //remove script style to prevent it from counting as text
  html = html.replace(/(<(noscript|script|style)\b[^>]*>).*?(<\/\2>)/gis, "$1$3");

  var chunks = html.split("<");

  for (var chunk of chunks) {
    if (!chunk.includes(">")) continue;

    var [element, text] = chunk.split(">");
    //if closing tag
    if (element[0] == "/") {
      dom.push({ tag: element });
      continue;
    }

    if (element[0] == "!") continue; //skip comments

    var domElement = {};
    //if has attributes
    var attributesIndex = element.indexOf(" ");

    if (attributesIndex == -1) {
      domElement.tag = element;
    } else  {
      var tag = element.substring(0, attributesIndex);
      domElement.tag = tag;
    
      //insert attr into domElement
      element
        .substring(attributesIndex)
        .split(" ")
        .forEach((attr) => {
          var [key, value] = attr.split("=");

          if (key && value) 
            domElement[key] = value?.replace(/"/g, "");
        })
    }

    // style and script, add their content to "content" and dont treat as text
    if ( ["style", "script","noscript"].includes(domElement.tag)) {
      domElement.content = text;
      continue;
    }
    

    dom.push(domElement);

    //if text node push as {text:""}
    if (text && text.trim().length) dom.push({ tag:"text", text: text });
  }


  dom = addDOMFunctions(dom);

  return dom;
};

export function addDOMFunctions(domObject) {
    //assign to all objects for easy chain calling
    domObject = domObject || Object.prototype;

  return Object.assign(domObject, {
    querySelectorAll: function (selector) {
      var type = selector[0];
      selector = selector.substring(1);

      if (type == ".")
        //class
        return this.filter((el) => el.class == selector);
      if (type == "#")
        //id
        return this.filter((el) => el.id == selector);
      if (type == "[")
        //attribute
        return this.filter((el) => el[selector] !== undefined);
      //tag
      else return this.filter(({ tag }) => tag.substring(1) == selector);
    },
    querySelector: function (selector) {
      return this.querySelectorAll(selector)[0];
    },
    textContent: function () {
      return this.reduce(
        (acc, { text }) => (acc += text ? text + "\n" : ""),
        ""
      );
    },
    getAttribute: function (attr) {
      return this.map((el) => el[attr]).filter(Boolean);
    },
    getElementsByTagName: function (tag) {
      return this.filter(({ tag: t }) => t == tag);
    },
    getElementsByClassName: function (className) {
      return this.filter((el) => el.class == className);
    },
    getElementById: function (id) {
      return this.filter((el) => el.id == id);
    },
    innerHTML: function () {
      return this.reduce((acc, el) => {
        if (el.tag)
          acc += `<${el.tag} ${Object.keys(el)
            .filter((key) => key != "tag")
            .map((key) => `${key}="${el[key]}"`)
            .join(" ")}>`;
        if (el.text) acc += `${el.text}`;
        return acc;
      }, "");
    },
  });
}
