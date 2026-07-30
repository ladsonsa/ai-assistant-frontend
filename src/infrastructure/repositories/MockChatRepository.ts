import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

export class MockChatRepository implements ChatRepository {
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