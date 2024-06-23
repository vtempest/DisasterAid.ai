import extractContent from "../html-to-content/html-to-content.js";
import { testYoutubeURL, fetchYoutubeText } from "../youtube-to-content/youtube-to-text.js";
import extractPDF from "../pdf-to-content/pdf-to-html.js";
import { weightKeySentences } from "../content-to-keyphrases/key-sentences.js";
import { fileTypeFromStream } from "file-type";
import fetch from "node-fetch";
import axios from "axios";

/**
 * Extract cite info and main formatted text content
 * Checks if URL is PDF, HTML or Youtube.
 * @param {document} document document or dom object with article content
 * @returns {object} {author, date, title, source, content, image}
 */
export default async function extract(url, options = {}) {
	options = options || {
		keyphrases: true,
		images: true,
		links: true,
		formatting: true,
		absoluteURLs: true,
	};
	var response;

	// try {
	//specific handlers -- youtube, pdf
	//TODO file-type
	var response = await fetch(url);
	// const stream = got.stream(url);

	const fileType = await fileTypeFromStream(response.body);

	//hidden pdf url that does not end with pdf
	if (fileType?.ext === "pdf" || url.endsWith("pdf")) {
		response = await extractPDF(url, {});
	} else {
		//html page

		try {
			var html = await response.text();
		} catch (e) {
			return { error: "Error in fetch" };
		}

		options.url = url;
		response = await extractContent(html, options);

		// if (testYoutubeURL(url)) {
		//   var { content, word_count, timestamps, format } = await fetchYoutubeText(
		//     url
		//   );

		//   response.html = content;
		//   response.format = format;
		//   response.word_count = word_count;
		//   // response.timestamps = timestamps;
		// }
	}

	if (response.html && options.keyphrases) {
		var plainText = response.html
			// ?.replace(/<[^>]*>/g, " ")
			.replaceAll("\n", " ");
		var { sorted_sentences, keyphraseGrams, sentences } = weightKeySentences(plainText);
		response.keyphrases = keyphraseGrams.map((k) => {
			k.sentences = k.sentences.join(" ");
			return k;
		});
		response.sorted_sentences = sorted_sentences;
		response.sentences = sentences;

		delete response.html;
	}

	var response2 = { url };
	Object.assign(response2, response);

	return response2;
	// } catch (e) {
	//   console.error("Error in extract", e);
	//   // return { error: e.message };
	// }
}
