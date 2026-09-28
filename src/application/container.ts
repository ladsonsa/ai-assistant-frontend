import { env } from "@/config/env";
import { SendConversationUseCase } from "@/domain/usecases/SendConversationUseCase";
import { ChatApi } from "@/infrastructure/api/ChatApi";
import { HttpChatRepository } from "@/infrastructure/repositories/HttpChatRepository";
import { MockChatRepository } from "@/infrastructure/repositories/MockChatRepository";

const chatRepository = env.useMock
    ? new MockChatRepository()
    : new HttpChatRepository(new ChatApi(env.apiUrl));

/**
 * Singleton instance of {@link SendConversationUseCase} configured with concrete
 * infrastructure dependencies ({@link ChatApi} and {@link HttpChatRepository}).
 */
export const sendConversationUseCase = new SendConversationUseCase(
  chatRepository
);