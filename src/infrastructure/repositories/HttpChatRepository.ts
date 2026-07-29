import { Message } from "@/domain/entities/Message";
import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { ChatApi } from "@/infrastructure/api/ChatApi";
import { MessageMapper } from "@/infrastructure/mappers/MessageMapper";

export class HttpChatRepository implements ChatRepository {
    public constructor(
        private readonly api: ChatApi,
    ) {}

    public async sendConversation(
        history: readonly Message[],
    ): Promise<Message> {
        const request = MessageMapper.toChatRequest(history);

        const response = await this.api.sendConversation(request);

        return MessageMapper.toDomain(response);
    }
}