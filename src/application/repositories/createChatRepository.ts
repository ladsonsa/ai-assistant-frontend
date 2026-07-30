import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { HttpChatRepository } from "@/infrastructure/repositories/HttpChatRepository";
import { createChatApi } from "@/application/api/createChatApi";

/**
 * Factory function that instantiates and configures a concrete ChatRepository instance using the HTTP implementation.
 *
 * @returns A fully initialized implementation of the ChatRepository contract.
 */
export function createChatRepository(): ChatRepository {
    return new HttpChatRepository(
        createChatApi(),
    );
}