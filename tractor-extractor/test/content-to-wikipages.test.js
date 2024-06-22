import { describe, it, expect } from "vitest";
import {
  WikiEntityRecognition,
  searchWikipedia,
} from "../src/content-to-keyphrases/content-to-wikipages";

import testArticle from "./output/tcomputex2024.json"

describe("wiki", () => { 
  it("WikiEntityRecognition", async () => {
  
    var html = testArticle.sentences.map(s=>s.text).join(" ");
     
    var output = await WikiEntityRecognition(html,{
      matchPositions: true,
      limit: 7,
      fetchSummaries: true, //takes longer
      plainText: false,
      summarySentenceLimit: 2,
    }); 
   
    console.log(output)

    expect(output).toBeDefined();
  },  30000);
});

