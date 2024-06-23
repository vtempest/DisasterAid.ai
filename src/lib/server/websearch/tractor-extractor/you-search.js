const options = {method: 'GET', headers: {'X-API-Key': 'bec6be6c-87cd-45f8-b430-fc0fc3799ac4<__>1PTsFeETU8N2v5f4qmtDZVGS'}};

import { sentences } from "sbd";
import extract from "./src/url-to-content/url-to-content.js";
import { de } from "chrono-node";


  
  // Call the function with a query parameter
  //fetchAndFilterNews('new mexico flooding');

  async function fetchAndFilterNews(userQuery) {
    const encodedQuery = encodeURIComponent(userQuery);
    const url = `https://api.ydc-index.io/news?query=${encodedQuery}`;
    const options = {
      method: 'GET', // Assuming GET request, you can modify options as per requirement
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': env.YOU_API_KEY,
        // Add other headers if needed
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const results = data.news.results;
  
      // Get the current date and time
      const currentDate = new Date();
  
      // Filter the results based on the page_age field
      const filteredResults = results.filter(item => {
        const pageAgeDate = new Date(item.page_age);
        const timeDifference = currentDate - pageAgeDate;
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        return hoursDifference <= 48;
      });
  
      // Extract the required fields
      const extractedData = filteredResults.map(item => ({
        url: item.url,
        source_name: item.source_name,
        article_date: item.page_age,
        title: item.title,
      }));
  
      // Return the extracted data
      return extractedData;
    } catch (err) {
      console.error(err);
      // Return an empty array or appropriate value in case of error
      return [];
    }
  }
  
  // Example usage:




export default async function process(searchTerms, options = {}) {
  var { limit = 5, topSentencesOnly = true } = options;  

    var data = await fetchAndFilterNews(searchTerms);


    
    // Extract URLs from the data array of objects
    var urls = Array.from(data).map(item => item.url).slice(0, limit);

    var allExtractions = [];
  
    for (var i in urls) {
      var url = urls[i];
      if (!url || !url.length) continue;
      var extraction = await extract(url, {
        keyphrases: true,
        formatting: true,
        images: false,
        links: true,
        absoluteURLs: true,
      }); 

      if(extraction && extraction.sentences?.length && topSentencesOnly){

        // console.log(extraction["sorted_sentences"]);
      try{
        extraction.topSentences = 
        Array.from(extraction["sorted_sentences"])?.map(sentence=> extraction?.sentences[sentence.index])


      }catch(e){ }
        delete extraction.sorted_sentences;
        delete extraction.sentences;
        delete extraction.keyphrases;
        
      }
      // extraction = JSON.stringify(extraction, null, 2);
  
      allExtractions.push(extraction);
    }

    return allExtractions;
  }

  