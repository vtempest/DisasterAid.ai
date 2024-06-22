import {
  getAvailableEmbeddingModelProviders,
  getAvailableChatModelProviders,
} from '../lib/providers';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { Embeddings } from '@langchain/core/embeddings';
import { ChatOpenAI } from '@langchain/openai';

    const searchParams = new URL(request.url, `http://${request.headers.host}`)
      .searchParams;

    const [chatModelProviders, embeddingModelProviders] = await Promise.all([
      getAvailableChatModelProviders(),
      getAvailableEmbeddingModelProviders(),
    ]);

    const chatModelProvider =
      searchParams.get('chatModelProvider') ||
      Object.keys(chatModelProviders)[0];
    const chatModel =
      searchParams.get('chatModel') ||
      Object.keys(chatModelProviders[chatModelProvider])[0];

    const embeddingModelProvider =
      searchParams.get('embeddingModelProvider') ||
      Object.keys(embeddingModelProviders)[0];
    const embeddingModel =
      searchParams.get('embeddingModel') ||
      Object.keys(embeddingModelProviders[embeddingModelProvider])[0];

    let llm: BaseChatModel | undefined;
    let embeddings: Embeddings | undefined;

    if (
      chatModelProviders[chatModelProvider] &&
      chatModelProviders[chatModelProvider][chatModel] &&
      chatModelProvider != 'custom_openai'
    ) {
      llm = chatModelProviders[chatModelProvider][chatModel] as
        | BaseChatModel
        | undefined;
    } else if (chatModelProvider == 'custom_openai') {
      llm = new ChatOpenAI({
        modelName: chatModel,
        openAIApiKey: searchParams.get('openAIApiKey'),
        temperature: 0.7,
        configuration: {
          baseURL: searchParams.get('openAIBaseURL'),
        },
      });
    }

    if (
      embeddingModelProviders[embeddingModelProvider] &&
      embeddingModelProviders[embeddingModelProvider][embeddingModel]
    ) {
      embeddings = embeddingModelProviders[embeddingModelProvider][
        embeddingModel
      ] as Embeddings | undefined;
    }
