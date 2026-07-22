import { Message } from "@/domain/entities/Message";

/**
 * Contract for chat data operations, handling the persistence and delivery of messages.
 */
export interface ChatRepository {
    /**
     * Sends a message through the repository provider and returns the persisted result.
     *
     * @param message The message instance to be sent.
     * @returns A promise that resolves to the sent message object.
     * @throws {Error} If the delivery or persistence process fails.
     */
    sendMessage(message: Message): Promise<Message>;
}