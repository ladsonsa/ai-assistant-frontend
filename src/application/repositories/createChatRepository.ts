import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { HttpChatRepository } from "@/infrastructure/repositories/HttpChatRepository";
import { MockChatRepository } from "@/infrastructure/repositories/MockChatRepository";
import { createChatApi } from "@/application/api/createChatApi";
import { env } from "@/config/env";

/**
 * Factory function that instantiates and returns an appropriate ChatRepository implementation
 * based on the current environment configuration.
 *
 * @returns A MockChatRepository instance if the mock environment flag is enabled; otherwise, an HttpChatRepository instance.
 */
export function createChatRepository(): ChatRepository {
    if (env.useMock) {
        return new MockChatRepository();
    }

    return new HttpChatRepository(
        createChatApi(),
    );
}