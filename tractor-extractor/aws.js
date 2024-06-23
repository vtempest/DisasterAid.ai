import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import dotenv from 'dotenv'
dotenv.config()

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_BEDROCK_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_BEDROCK_SECRET_ACCESS_KEY,
  },
});

async function invokeModel() {
    const messages = [
        { role: "user", content: "Hello, world. what is amazon?" }
    ];

    // Prepare the request parameters
    const params = {
        modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
        body: JSON.stringify({
            prompt: messages,
            max_gen_len: 512,
            temperature: 0.5,
            top_p: 0.9
        }),
        contentType: "application/json",
        accept: "*/*"
    };


  const command = new ConverseCommand(params);

  try {
    const data = await client.send(command);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

invokeModel();
