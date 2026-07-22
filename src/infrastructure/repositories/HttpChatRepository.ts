import { Message, MessageRole } from "@/domain/entities/Message";
import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { ChatApi } from "../api/ChatApi";

export class HttpChatRepository implements ChatRepository {
    public constructor(
        private readonly api: ChatApi,
    ) {}

    public async sendMessage(message: Message): Promise<Message> {
        const response = await this.api.sendMessage(message.content);

        return {
            id: crypto.randomUUID(),
            role: MessageRole.ASSISTANT,
            content: response,
        };
    }
}