const { parseHTML } = require('linkedom');
import chrono  from 'chrono-node';

/**
 * Scrapes Google News for a given search term,
 * get article real urls from google news id's from object in <script>
 *
 * @param {object} page - pass in created page object
 * @param {object} searchParams - search parameters
 * @return {Object} results [{url, title, date, source, author}]
 * @throws {Error} If no search results are found or bot detected
 */
export default async function fetchGoogleNews(searchParams) {
  var { searchTerm } = searchParams;

  const url = 'https://news.google.com/search?hl=en-US&q=' + searchTerm;

  var html = await (await fetch(url)).text();

  if (html.includes('Our systems have detected unusual traffic'))
    throw new Error('Google blocked search requests, bot detected.');

  const { document } = parseHTML(html);

  var results = document.querySelectorAll('article').map((e) => ({
    url_google: e.querySelector("a[tabindex='0']")?.href,
    title: e.querySelector("a[tabindex='0']")?.innerText,
    date: chrono
      .parseDate(e.querySelector('time')?.innerText)
      .toISOString()
      .split('T')[0],
    source: e.querySelector('div[data-n-tid]')?.innerText,
    author: e.querySelector('hr+div>span:first-child')?.innerText || false,
  }));

  // google news results dont have real article urls, '
  // only IDs that redirect to google news article
  // we get article real urls from google news id's from object in <script>
  var firstResultID = results[0].url_google.split('?')[0].split('/')[2];
  var scriptObject = html.match(new RegExp(`<script .+${firstResultID}.+`))[0];

  results = results.map((result) => {
    var { url_google } = result;

    if (url_google.startsWith('./articles/')) {
      var articleID = url_google.split('?')[0].split('/')[2];
      var articleIDIndex = scriptObject.indexOf(articleID);

      const matchURlRegExp =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
      var articleURL = scriptObject
        .slice(articleIDIndex)
        .match(matchURlRegExp)[0];

      delete result.url_google;
    }

    result.url = articleURL;
    return result;
  });

  return results;
}
