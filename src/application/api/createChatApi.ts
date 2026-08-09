import { ChatApi } from "@/infrastructure/api/ChatApi";

/**
 * Factory function that instantiates and returns a new {@link ChatApi} HTTP client instance.
 *
 * @returns A fresh instance of the ChatApi service.
 */
export function createChatApi(): ChatApi {
    return new ChatApi();
}