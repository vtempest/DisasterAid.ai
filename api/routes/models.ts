import { logger } from 'hono/logger'
import {
  getAvailableChatModelProviders,
  getAvailableEmbeddingModelProviders,
} from '../lib/providers';


export default async function routeModels(c) {
      try {
    const [chatModelProviders, embeddingModelProviders] = await Promise.all([
      getAvailableChatModelProviders(),
      getAvailableEmbeddingModelProviders(),
    ]);

    return c.json({ chatModelProviders, embeddingModelProviders });
  } catch (err) {
    logger(err.message);
    return c.json({ message: 'An error has occurred.' });
  }
}