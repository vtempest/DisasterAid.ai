import type { BackendTool } from "..";
import extract from "../../websearch/tractor-extractor/src/url-to-content/url-to-content.js";

const fetchUrl: BackendTool = {
	name: "fetch_url",
	displayName: "URL Fetcher",
	description: "A tool that can be used to fetch an URL and return the content directly.",
	isOnByDefault: true,
	parameterDefinitions: {
		url: {
			description: "The url that should be fetched.",
			type: "str",
			required: true,
		},
	},
	async *call(params) {
		const blocks = String(params.url).split("\n");
		const url = blocks[blocks.length - 1];

		const extraction = await extract(url, Infinity);

		const { title } = extraction;
		return {
			outputs: [{ title, text: JSON.stringify(extraction, null, 2) }],
			display: false,
		};
	},
};

export default fetchUrl;
