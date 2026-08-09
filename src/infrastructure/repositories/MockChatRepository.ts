import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

/**
 * Mock implementation of the ChatRepository interface used for testing
 * or offline development purposes.
 */
export class MockChatRepository implements ChatRepository {
    /**
     * Simulates sending a conversation history by introducing an artificial delay before
     * returning a mock assistant response based on the last message received.
     *
     * @param history An immutable array of Message domain entities representing the conversation context.
     * @returns A promise that resolves to a newly created assistant Message entity.
     */
    public async sendConversation(
        history: readonly Message[],
    ): Promise<Message> {
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 800);
        });

        const lastMessage = history.at(-1);

        return new Message(
            crypto.randomUUID(),
            MessageRole.ASSISTANT,
            `Mock response: ${lastMessage?.content ?? ""}`,
        );
    }
}