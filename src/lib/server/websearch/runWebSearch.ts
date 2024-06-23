import { defaultEmbeddingModel, embeddingModels } from "$lib/server/embeddingModels";

import type { Conversation } from "$lib/types/Conversation";
import type { Message } from "$lib/types/Message";
import type { WebSearch, WebSearchScrapedSource } from "$lib/types/WebSearch";
import type { Assistant } from "$lib/types/Assistant";
import type { MessageWebSearchUpdate } from "$lib/types/MessageUpdate";

import { search } from "./search/search";
// import { scrape } from "./scrape/scrape";

import extract from "./tractor-extractor/src/url-to-content/url-to-content.js";

import { findContextSources } from "./embed/embed";
import { removeParents } from "./markdown/tree";
import {
	makeErrorUpdate,
	makeFinalAnswerUpdate,
	makeGeneralUpdate,
	makeSourcesUpdate,
} from "./update";
import { mergeAsyncGenerators } from "$lib/utils/mergeAsyncGenerators";
// import { MetricsServer } from "../metrics";

const MAX_N_PAGES_TO_SCRAPE = 3 as const;
const MAX_N_PAGES_TO_EMBED = 2 as const;

export async function* runWebSearch(
	conv: Conversation,
	messages: Message[],
	ragSettings?: Assistant["rag"],
	query?: string
): AsyncGenerator<MessageWebSearchUpdate, WebSearch, undefined> {
	const prompt = messages[messages.length - 1].content;
	const createdAt = new Date();
	const updatedAt = new Date();

	// MetricsServer.getMetrics().webSearch.requestCount.inc();

	try {
		const embeddingModel =
			embeddingModels.find((m) => m.id === conv.embeddingModel) ?? defaultEmbeddingModel;
		if (!embeddingModel) {
			throw Error(`Embedding model ${conv.embeddingModel} not available anymore`);
		}

		// Search the web
		const { searchQuery, pages } = yield* search(messages, ragSettings, query);
		if (pages.length === 0) throw Error("No results found for this search query");

		// Scrape pages
		yield makeGeneralUpdate({ message: "Browsing search results" });


		const urls = pages.slice(0, MAX_N_PAGES_TO_SCRAPE)
			.map(({ link }) => link)

		console.log(urls)


		const allScrapedPages = [];

		for (const i in urls) {
			const url = urls[i];
			if (!url || !url.length) continue;
			const extraction = await extract(url, {
				keyphrases: true,
				formatting: true,
				images: false,
				links: true,
				absoluteURLs: true,
			});

			console.log(extraction)

			if (extraction && extraction.sentences?.length) {

				// console.log(extraction["sorted_sentences"]);
				try {
					extraction.topSentences =
						Array.from(extraction["sorted_sentences"])?.map(
							sentence => extraction?.sentences[sentence.index])


				} catch (e) { }

				delete extraction.sorted_sentences;
				delete extraction.sentences;
				delete extraction.keyphrases;

			}
			// extraction = JSON.stringify(extraction, null, 2);

			allScrapedPages.push(extraction);
		}

		console.log(allScrapedPages)



		const contextSources = JSON.stringify(allScrapedPages);


		console.log(contextSources)

		// if (!scrapedPages.length) {
		// 	throw Error(`No text found in the first ${MAX_N_PAGES_TO_SCRAPE} results`);
		// }

		// // // Chunk the text of each of the elements and find the most similar chunks to the prompt
		// // yield makeGeneralUpdate({ message: "Extracting relevant information" });
		// // const contextSources = await findContextSources(scrapedPages, prompt, embeddingModel).then(
		// // 	(ctxSources) =>
		// // 		ctxSources.map((source) => ({
		// // 			...source,
		// // 			page: { ...source.page, markdownTree: removeParents(source.page.markdownTree) },
		// // 		}))
		// // );
		// // yield makeSourcesUpdate(contextSources);

		const webSearch: WebSearch = {
			prompt,
			searchQuery,
			results: allScrapedPages,
			contextSources,
			createdAt,
			updatedAt,
		};
		yield makeFinalAnswerUpdate();
		return webSearch;
	} catch (searchError) {
		const message = searchError instanceof Error ? searchError.message : String(searchError);
		console.error(message);
		yield makeErrorUpdate({ message: "An error occurred", args: [message] });

		const webSearch: WebSearch = {
			prompt,
			searchQuery: "",
			results: [],
			contextSources: [],
			createdAt,
			updatedAt,
		};
		yield makeFinalAnswerUpdate();
		return webSearch;
	}
}
