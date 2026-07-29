import { createChatRepository } from "@/application/repositories/createChatRepository";
import { SendConversationUseCase } from "@/domain/usecases/SendConversationUseCase";

export function createSendConversationUseCase(): SendConversationUseCase {
    return new SendConversationUseCase(
        createChatRepository(),
    );
}