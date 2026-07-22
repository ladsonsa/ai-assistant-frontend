import { Message } from "@/domain/entities/Message";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

/**
 * Use case responsible for orchestrating the process of sending a message.
 */
export class SendMessageUseCase {
    /**
     * Initializes a new instance of the SendMessageUseCase class.
     *
     * @param repository The repository implementation used for chat operations.
     */
    public constructor(
        private readonly repository: ChatRepository,
    ) {}

    /**
     * Executes the send message business logic by delegating to the repository.
     *
     * @param message The message domain entity to be sent.
     * @returns A promise that resolves to the sent message instance.
     * @throws {Error} If the message transmission fails at the repository layer.
     */
    public async execute(message: Message): Promise<Message> {
        return this.repository.sendMessage(message);
    }
}