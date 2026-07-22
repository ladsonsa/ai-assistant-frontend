import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRepository } from "@/domain/repositories/ChatRepository";
import { ChatApi } from "../api/ChatApi";

/**
 * Concrete implementation of the ChatRepository interface that communicates
 * with an external HTTP API provider.
 */
export class HttpChatRepository implements ChatRepository {
    /**
     * Initializes a new instance of the HttpChatRepository class.
     *
     * @param api The ChatApi instance used for low-level HTTP requests.
     */
    public constructor(
        private readonly api: ChatApi,
    ) {}

    /**
     * Sends a message to the backend API and constructs an assistant response Message entity.
     *
     * @param message The domain message entity to send.
     * @returns A promise that resolves to a new Message entity containing the assistant's reply.
     * @throws {Error} If the underlying HTTP API request fails.
     */
    public async sendMessage(message: Message): Promise<Message> {
        const response = await this.api.sendMessage(message.content);

        return new Message(
            crypto.randomUUID(),
            MessageRole.ASSISTANT,
            response
        );
    }
}