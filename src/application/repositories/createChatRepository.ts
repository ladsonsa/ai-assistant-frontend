import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { MockChatRepository } from "@/infrastructure/repositories/MockChatRepository";

export function createChatRepository(): ChatRepository {
    return new MockChatRepository();
}