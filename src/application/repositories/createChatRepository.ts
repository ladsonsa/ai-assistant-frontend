import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { HttpChatRepository } from "@/infrastructure/repositories/HttpChatRepository";
import { MockChatRepository } from "@/infrastructure/repositories/MockChatRepository";
import { createChatApi } from "@/application/api/createChatApi";
import { env } from "@/config/env";

/**
 * Factory function that instantiates and configures a concrete ChatRepository instance using the HTTP implementation.
 *
 * @returns A fully initialized implementation of the ChatRepository contract.
 */
export function createChatRepository(): ChatRepository {
    if (env.useMock) {
        return new MockChatRepository();
    }

    return new HttpChatRepository(
        createChatApi(),
    );
}