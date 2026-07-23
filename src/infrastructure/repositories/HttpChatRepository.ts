import { ChatApi } from "@/infrastructure/api/ChatApi";
import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

/**
 * Concrete implementation of the ChatRepository interface that delivers
 * conversation histories to a remote API provider over HTTP.
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
     * Sends the complete conversation history to the API and constructs a new assistant Message entity from the response.
     *
     * @param history An immutable array of Message entities representing the conversation context.
     * @returns A promise that resolves to a newly created assistant Message entity containing the response content and metadata.
     * @throws {Error} If the underlying HTTP API request or payload parsing fails.
     */
    public async sendConversation(
        history: readonly Message[],
    ): Promise<Message> {
        const response = await this.api.sendConversation(history);

        return new Message(
            crypto.randomUUID(),
            MessageRole.ASSISTANT,
            response.content,
            response.metadata,
        );
    }
}