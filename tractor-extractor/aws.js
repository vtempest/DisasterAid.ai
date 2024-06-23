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
  const params = {
    modelId: "meta.llama2-13b-chat-v1",
    body: JSON.stringify({
      prompt: "I need an idea for an app to build on Amazon Bedrock.",
      max_gen_len: 512,
      temperature: 0.5,
      top_p: 0.9,
    }),
    contentType: "application/json",
    accept: "*/*",
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
