import type { ImageBlockParam, MessageParam } from "@anthropic-ai/sdk/resources";
import type { EndpointMessage } from "../endpoints";
import type { MessageFile } from "$lib/types/Message";

export async function fileToImageBlock(
	file: MessageFile,
	opts: any
): Promise<any> {
	return false
}

type NonSystemMessage = EndpointMessage & { from: "user" | "assistant" };

export async function endpointMessagesToAnthropicMessages(
	messages: EndpointMessage[],
	multimodal: { image: any }
): Promise<MessageParam[]> {
	return await Promise.all(
		messages
			.filter((message): message is NonSystemMessage => message.from !== "system")
			.map<Promise<MessageParam>>(async (message) => {
				return {
					role: message.from,
					content: [
						...(await Promise.all(
							(message.files ?? []).map((file) => fileToImageBlock(file, multimodal.image))
						)),
						{ type: "text", text: message.content },
					],
				};
			})
	);
}
