import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { getAvailableChatModelProviders } from '../lib/providers';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import handleVideoSearch from '../agents/videoSearchAgent';
import { logger } from 'hono/logger'


export default async function routeVideos(c) {
  try {
    let query = c.req.query("query");
    let chat_history = c.req.query("chat_history") || [];
    let chat_model_provider = c.req.query("chat_model_provider");
    let chat_model = c.req.query("chat_model");

    chat_history = chat_history.map((msg: any) => {
      if (msg.role === 'user') {
        return new HumanMessage(msg.content);
      } else if (msg.role === 'assistant') {
        return new AIMessage(msg.content);
      }
    });

    const chatModels = await getAvailableChatModelProviders();
    const provider = chat_model_provider || Object.keys(chatModels)[0];
    const chatModel = chat_model || Object.keys(chatModels[provider])[0];

    let llm: BaseChatModel | undefined;

    if (chatModels[provider] && chatModels[provider][chatModel]) {
      llm = chatModels[provider][chatModel] as BaseChatModel | undefined;
    }

    if (!llm) {
      return c.json({ message: 'Invalid LLM model selected' });
    }

    const videos = await handleVideoSearch({ chat_history, query }, llm);

    return c.json({ videos });
  } catch (err) {
    logger(`Error in video search: ${err.message}`);
    return c.json({ message: 'An error has occurred.' });
  }
}