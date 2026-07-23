import { Message } from "@/domain/entities/Message";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

/**
 * Use case responsible for orchestrating the transmission of a full conversation history.
 */
export class SendConversationUseCase {
    /**
     * Initializes a new instance of the SendConversationUseCase class.
     *
     * @param repository The repository implementation used for chat operations.
     */
    public constructor(
        private readonly repository: ChatRepository,
    ) {}

    /**
     * Executes the business logic to send a conversation history by delegating to the repository.
     *
     * @param history An immutable array of Message domain entities representing the chat history.
     * @returns A promise that resolves to the newly generated assistant Message entity.
     * @throws {Error} If the conversation processing fails at the repository layer.
     */
    public async execute(
        history: readonly Message[],
    ): Promise<Message> {
        return this.repository.sendConversation(history);
    }
}