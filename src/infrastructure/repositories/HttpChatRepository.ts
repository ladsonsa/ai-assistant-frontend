import { Message } from "@/domain/entities/Message";
import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { ChatApi } from "@/infrastructure/api/ChatApi";
import { MessageMapper } from "@/infrastructure/mappers/MessageMapper";

/**
 * Concrete implementation of the ChatRepository interface that delivers
 * conversation histories to a remote API provider over HTTP using domain mappers.
 */
export class HttpChatRepository implements ChatRepository {
    /**
     * Initializes a new instance of the HttpChatRepository class.
     *
     * @param api The ChatApi client used to perform HTTP network requests.
     */
    public constructor(
        private readonly api: ChatApi,
    ) {}

    /**
     * Maps the conversation history to a request payload, sends it to the API,
     * and maps the returned response back into a domain Message entity.
     *
     * @param history An immutable array of Message entities representing the conversation context.
     * @returns A promise that resolves to the newly created assistant Message domain entity.
     * @throws {Error} If the underlying HTTP request or mapper translation fails.
     */
    public async sendConversation(
        history: readonly Message[],
    ): Promise<Message> {
        const request = MessageMapper.toChatRequest(history);

        const response = await this.api.sendConversation(request);

        return MessageMapper.toDomain(response);
    }
}