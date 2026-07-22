import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

/**
 * Mock implementation of the ChatRepository interface used for testing
 * or offline development purposes.
 */
export class MockChatRepository implements ChatRepository {
    /**
     * Simulates sending a message by introducing a artificial delay before
     * returning a static mock response entity.
     *
     * @param message The domain message entity to send.
     * @returns A promise that resolves to a newly created assistant Message entity.
     */
    public async sendMessage(message: Message): Promise<Message> {
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 800);
        });

        return new Message(
            crypto.randomUUID(),
            MessageRole.ASSISTANT,
            `Mock response: ${message.content}`,
        );
    }
}