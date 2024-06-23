import { runWebSearch } from "$lib/server/websearch/runWebSearch";
import { preprocessMessages } from "../endpoints/preprocessMessages";

import { generateTitleForConversation } from "./title";
import {
	assistantHasDynamicPrompt,
	assistantHasWebSearch,
	getAssistantById,
	processPreprompt,
} from "./assistant";
import { pickTools, runTools } from "./tools";
import type { WebSearch } from "$lib/types/WebSearch";
import {
	type MessageUpdate,
	MessageUpdateType,
	MessageUpdateStatus,
} from "$lib/types/MessageUpdate";
import { generate } from "./generate";
import { mergeAsyncGenerators } from "$lib/utils/mergeAsyncGenerators";
import type { TextGenerationContext } from "./types";
import type { ToolResult } from "$lib/types/Tool";
import { toolHasName } from "../tools/utils";
import directlyAnswer from "../tools/directlyAnswer";

import process from "../websearch/tractor-extractor/you-search.js"
import invokeModel from "../websearch/tractor-extractor/aws.js"

import { SummaryAgentPrompt, evacuationCenters } from "./prompts.js";


export async function textGeneration(ctx: TextGenerationContext) {

	const { conv, toolsPreference, messages, convId } = ctx;


	const q = conv.messages.filter((m) => m.from === "user").map((m) => m.content).join("\n");


	console.log(q)
	const webSearchResult = await process(q)


	const extractionString = JSON.stringify(webSearchResult)

	console.log(extractionString)



	const queryString =
		SummaryAgentPrompt +
		"Evacuation Centers: " +
		JSON.stringify(evacuationCenters, null, 2) +
		"NEWS: " +
		extractionString;

	let response = await invokeModel(queryString);

	response = response?.output.message?.content[0]?.text;
	console.log(response);

	return response


	// let preprompt = conv.preprompt;
	// if (assistantHasDynamicPrompt(assistant) && preprompt) {
	// 	preprompt = await processPreprompt(preprompt);
	// 	if (messages[0].from === "system") messages[0].content = preprompt;
	// }

	// let toolResults: ToolResult[] = [];

	// if (model.tools && !conv.assistantId) {
	// 	const tools = pickTools(toolsPreference, Boolean(assistant));
	// 	const toolCallsRequired = tools.some((tool) => !toolHasName(directlyAnswer.name, tool));
	// 	if (toolCallsRequired) toolResults = yield* runTools(ctx, tools, preprompt);
	// }

	// const processedMessages = await preprocessMessages(messages, webSearchResult, convId);
	// yield* generate({ ...ctx, messages: processedMessages }, toolResults, preprompt);
}
