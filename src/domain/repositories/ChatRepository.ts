import { Message } from "@/domain/entities/Message";

/**
 * Contract for chat data operations, handling conversation session delivery and persistence.
 */
export interface ChatRepository {
    /**
     * Sends an entire conversation history to the repository provider and returns the assistant's reply.
     *
     * @param history An immutable array of Message entities representing the conversation context.
     * @returns A promise that resolves to the generated assistant Message object.
     * @throws {Error} If the transmission or processing of the conversation fails.
     */
    sendConversation(
        history: readonly Message[],
    ): Promise<Message>;
}