import { env } from "@/config/env";
import { SendConversationUseCase } from "@/domain/usecases/SendConversationUseCase";
import { ChatApi } from "@/infrastructure/api/ChatApi";
import { HttpChatRepository } from "@/infrastructure/repositories/HttpChatRepository";

const chatApi = new ChatApi(env.apiUrl);
const chatRepository = new HttpChatRepository(chatApi);

/**
 * Singleton instance of {@link SendConversationUseCase} configured with concrete
 * infrastructure dependencies ({@link ChatApi} and {@link HttpChatRepository}).
 */
export const sendConversationUseCase = new SendConversationUseCase(
  chatRepository
);