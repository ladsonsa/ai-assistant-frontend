import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { HttpChatRepository } from "@/infrastructure/repositories/HttpChatRepository";
import { createChatApi } from "../api/createChatApi";

/**
 * Factory function that instantiates and returns a concrete {@link ChatRepository} implementation.
 * Composes an {@link HttpChatRepository} by injecting a newly created {@link ChatApi} instance.
 *
 * @returns A fully initialized {@link ChatRepository} ready for handling message persistence and transmission.
 */
export const createChatRepository = (): ChatRepository => {
  const chatApi = createChatApi();
  return new HttpChatRepository(chatApi);
};