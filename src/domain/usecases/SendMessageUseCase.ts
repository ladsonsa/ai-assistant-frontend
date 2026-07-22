import { Message } from "@/domain/entities/Message";
import { ChatRepository } from "@/domain/repositories/ChatRepository";

export class SendMessageUseCase {
    public constructor(
        private readonly repository: ChatRepository,
    ) {}

    public async execute(message: Message): Promise<Message> {
        return this.repository.sendMessage(message);
    }
}