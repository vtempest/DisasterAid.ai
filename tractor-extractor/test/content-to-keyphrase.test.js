import { describe, it, expect } from "vitest";
import {
  weightKeySentences,
  weightKeyphraseQuery,
} from "../src/content-to-keyphrases/key-sentences";
import extract from "../src/url-to-content/url-to-content";
import fs from 'fs';

describe("top sentences textrank", () => {
  it("get top sentences specific to a query", async () => {
    return 1;
    var url =
      "https://ora.ox.ac.uk/objects/uuid:44c386c4-5d9e-4ecf-a47c-9631a2a59747/files/mb5d6febf23502ea79f57c9be3516c4d3";

    var extraction = await extract(url, { keyphrases: 1 });

    let summary_obj = weightKeySentences(extraction.html, 5);

    var query = "posthuman civilizations";
    summary_obj.sorted_sentences = weightKeyphraseQuery(
      summary_obj.sorted_sentences,
      query
    );

    fs.writeFileSync(
      __dirname + "/output/bostrom-query-posthuman.json",
      JSON.stringify(summary_obj, null, 2)
    );
    expect(typeof summary_obj).toBe("object");
  }, 20000);
});
