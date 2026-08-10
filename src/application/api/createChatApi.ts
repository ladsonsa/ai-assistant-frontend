import { env } from "@/config/env";
import { ChatApi } from "@/infrastructure/api/ChatApi";

/**
 * Factory function that instantiates and returns a configured {@link ChatApi} instance
 * initialized with the global environment's base API URL.
 *
 * @returns A new instance of {@link ChatApi} configured with the base environment API URL.
 */
export const createChatApi = (): ChatApi => {
  return new ChatApi(env.apiUrl);
};