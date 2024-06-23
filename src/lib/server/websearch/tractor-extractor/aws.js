import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { env } from "$env/dynamic/private";

const client = new BedrockRuntimeClient({
	region: "us-east-1",
	credentials: {
		accessKeyId: env.AWS_BEDROCK_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_BEDROCK_SECRET_ACCESS_KEY,
	},
});

export default async function invokeModel(queryString) {
	// Prepare the request parameters
	const params = {
		modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",

		max_tokens: 1024,
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: queryString,
					},
				],
			},
		],
	};

	const command = new ConverseCommand(params);

	try {
		const data = await client.send(command);
		return data;
	} catch (error) {
		console.error(error);
	}
}
