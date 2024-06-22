import { retext } from "retext";
import retextKeywords from "retext-keywords";
import retextPos from "retext-pos";
import * as SentenceSplitter from "sentence-splitter";

/**
 *  Extract key phrases & key entities with retext-keywords
 *  which uses part-of-speech tags to find n-gram phrases, then normalizes them to
 * @param {string} text
 * @param {object} options {maximum, includePositions}
 * @return {array}  array of {value, count} sorted by frequency
 */
export default async function extractKeywords(text, options) {
  var maximum = options?.maximum || 30;
  var {
    includePositions = true,
  } = options || {};

  var plaintext = text.replace(/<[^>]*>?/gm, " . \n ");

  if (!plaintext || !plaintext.length) return {error: "No text"};
  
  const file = await retext()
    .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
    .use(retextKeywords, { maximum })
    .process(plaintext);

  var keyphrases = file?.data?.keyphrases
    .map((phrase) => ({
      value: phrase.matches[0].nodes
        .map((node) =>
          node.children
            ?.filter((subnode) => !!subnode.value)
            .map((subnode) => subnode.value)
            .join("")
        )
        .join(" ")
        .replace(/\s+/g, " "),
      matchesStarts: includePositions
        ? phrase.matches.map((match) => 
            match.nodes[0].position.start.offset,
            // match.nodes[0].position.end.offset,
          )
        : null,
      count: phrase.matches.length,
    }))
    .filter(
      (phrase) =>
        phrase.value?.length > 5 &&
        !["https", "href", "img src", "br/"].includes(phrase.value)
    );

    keyphrases = keyphrases.sort((a, b) => b.count - a.count);


    var average = keyphrases.reduce((a, b) => a + b.count, 0) / keyphrases.length;
    var deviation = standardDeviation(keyphrases.map(phrase=>phrase.count))
    keyphrases = keyphrases.map(phrase=>{phrase.weight=Math.max(1,(phrase.count)/deviation); return phrase})
    
    var sentences = splitSentences(plaintext).map((sentence, sentenceIndex) => {
      var {raw, range} = sentence;
      var [start, end] = range;

      var keyphraseCount = 0, weight = 0, weight2 = 0;

      keyphrases.forEach((phrase) => {
        
        phrase.matchesStarts.forEach(matchStart => {

        if (start<=matchStart && matchStart<end) {
          weight += phrase.count;
          weight2 += phrase.weight;
          keyphraseCount++;
        }

        });
      });

      var density =  keyphraseCount / Math.log( Math.max(1,(start-end)-30) ) ;
      weight2 = weight2  
      
      return {start, end, raw, sentenceIndex, weight, weight2};
    }
  );
  const percentTopSentences = 30;

  var numberTopSentences = Math.floor( sentences.length * percentTopSentences / 100)
  var keysentences = sentences
  .sort((a, b) => b.weight2 - a.weight2)
    .slice(0,numberTopSentences)

  keyphrases = keyphrases.map(phrase=>{phrase.matchesStarts=phrase.matchesStarts.join(", "); return phrase})

  return {sentences: keysentences, keyphrases};
}

/**
 *  list of 125 common stop words
 * @param {Array} stopWords
 */
export function getStopWords() {
  // prettier-ignore
  return [ "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "can", "will", "just", "don", "should", "now" ]
}

/**
 * Splits any string of sentences into array of sentences
 * uses https://github.com/textlint-rule/sentence which
 * understands abbreviations, numbers, quotes, etc
 *
 * @param {string} text string of sentences with varied punctuation
 * @returns {array} array of sentence text  in original text
 */
export function splitSentences(text) {
  return SentenceSplitter.split(text)
    .filter(({ type }) => type == "Sentence")
    // .map(({ raw, range }, index) => range);
}

//simpler no-dependency version
export function splitSentencesRegExp(text) {

  return text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")

}



/**
 * Calculate standard deviation of array
 * https://en.wikipedia.org/wiki/Standard_error
 * @param {array} array
 * @returns {int} number of standard deviation from average
 */
const standardDeviation = (array) => {
  var mean = average(array);
  return array.length && Math.sqrt(average(array.map((x) => (x - mean) ** 2)));
};

/**
 * @param {array} array
 * @returns {int} average/mean of array
 */
const average = (array) =>
  array.length && array.reduce((a, b) => a + b) / array.length;
