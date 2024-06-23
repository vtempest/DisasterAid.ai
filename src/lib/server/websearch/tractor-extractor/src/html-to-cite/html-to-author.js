
/**
 * Extract author cite info from document using common class names and looking for "by " line in text
 *
 * @param {document} document document or dom object with article content
 * @returns {string} author
 */
export default function extractAuthor(document) {
  var arrAuthors, strBodyText, strByLine, author;

  arrAuthors = document.getElementsByClassName("author"); //Try author
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("Author");
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("sailthru.author");
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("byl");
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("byline");

  if (arrAuthors.length > 0) author = arrAuthors[0]?.textContent.trim();

  //youtube channel name
  if (arrAuthors.length <= 0)
    author = document
      .querySelectorAll("link[itemprop='name']")?.[0]
      ?.getAttribute("content");

  //Try to find a div of byline or author class - done separately from regex below for speed, to avoid looping all elements if unnecessary
  if (typeof author == "undefined") {
    arrAuthors = document.getElementsByClassName("author");
    if (arrAuthors.length <= 0) {
      arrAuthors = document.getElementsByClassName("byline");
    }
    if (arrAuthors.length > 0) {
      author = arrAuthors[0].innerText.trim(); //If anything found, assign Name the innerText
      if (author.indexOf("\n") != -1) {
        author = author.slice(0, author.indexOf("\n") + 1);
      } //Slice end if there's a newline
   
    }
  }

  //Try to find any div with "author" or "byline" in part of the id or classname
  if (typeof author == "undefined") 
    Array.from(document.getElementsByTagName("div"))
    .concat(Array.from(document.getElementsByTagName("span")))
    .forEach((div) => {
      if (
        div.id.search(/author/i) > -1 ||
        div.className.search(/author/i) > -1 ||
        div.id.search(/byline/i) > -1 ||
        div.className.search(/byline/i) > -1
      ) {
        author = div.innerText.trim();
        if (author.indexOf("\n") > 0) {
          author = author.slice(0, author.indexOf("\n") + 1);
        } //Slice end if there's a newline
    
        var n = indexOfNthMatch(author, " ", 2); //find 2nd space
        if (n > 0) {
          author = author.slice(0, n).trim();
        } //slice off everything after 2nd space
      }
    })

  //clean up  remove by
  author = author?.trim().replace(/by /gi, '') || "";

  return author;
}

/**
 * Find nth occurrence of a character in a string
 * @param {string} string string to search in
 * @param {string} char character to find
 * @param {number} nth what occurrence of that character to match
 * @returns {number} index of nth occurrence of char in string
 */
function indexOfNthMatch(string, char, nth) {
  var first_index = string.indexOf(char);
  var length_up_to_first_index = first_index + 1;

  if (nth == 1) {
    return first_index;
  } else {
    var string_after_first_occurrence = string.slice(length_up_to_first_index);
    var next_occurrence = indexOfNthMatch(
      string_after_first_occurrence,
      char,
      nth - 1
    );

    if (next_occurrence === -1) {
      return -1;
    } else {
      return length_up_to_first_index + next_occurrence;
    }
  }
}
