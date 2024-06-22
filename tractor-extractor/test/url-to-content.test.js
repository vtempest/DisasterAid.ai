import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import extract from "../src/url-to-content/url-to-content";

import * as fsExtra from "fs-extra";
const INPUT_FOLDER = "./test/input";

const OUTPUT_FOLDER = "./test/output";
// fsExtra.emptyDirSync(OUTPUT_FOLDER);
/**
 * WECITE - Webpage Edge Cases for Interface Text Extraction
 * benchmarking test toolkit of news article URLs to parse into
 * structured data
 */
 
const urls = [
  "https://ora.ox.ac.uk/objects/uuid:44c386c4-5d9e-4ecf-a47c-9631a2a59747/files/mb5d6febf23502ea79f57c9be3516c4d3",
  // "https://www.sandofsky.com/lambda-school/",
  "https://hakaimagazine.com/videos-visuals/rice-farming-gets-an-ai-upgrade/",
  // "https://www.gurwinder.blog/p/the-intellectual-obesity-crisis",
  "https://www.raptitude.com/2024/06/nobody-knows-whats-going-on/",
  // "https://www.cnn.com/2024/06/03/business/zero-down-mortgage-nightcap/index.html",
  "https://www.anandtech.com/show/21415/amd-unveils-ryzen-9000-cpus-for-desktop-zen-5-takes-center-stage-at-computex-2024",
  // "https://www.youtube.com/watch?v=YALpX8oOn78"
];

describe("url to content", () => {
  it("url to content and cite", async () => {
    for (var i in urls) {
      var url = urls[i];
      if (!url || !url.length) continue;
      var extraction = await extract(url, {
        keyphrases: true,
        formatting: true,
        images: true,
        links: true,
        absoluteURLs: true,
      }); 
      extraction = JSON.stringify(extraction, null, 2);

      var outputPath = url.slice(-15).replace(/[^A-Za-z0-9]/g, "") + ".json";
      if (extraction)
        fs.writeFileSync(path.join(OUTPUT_FOLDER, outputPath), extraction);

      // console.log(extraction);
    }

    expect(extraction).toBeDefined();
  }, 200000);
});
