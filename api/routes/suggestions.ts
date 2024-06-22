import generateSuggestions from '../agents/suggestionGeneratorAgent';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { getAvailableChatModelProviders } from '../lib/providers';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { logger } from 'hono/logger'


export default async function routeSuggestions(c) {
  try {
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
      return;
    }

    const suggestions = await generateSuggestions({ chat_history }, llm);

    return c.json({ suggestions: suggestions });
  } catch (err) {
    logger(`Error in generating suggestions: ${err.message}`);
    return c.json({ message: 'An error has occurred.' });
  }
}