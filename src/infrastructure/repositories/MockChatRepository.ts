import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

export class MockChatRepository implements ChatRepository {
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