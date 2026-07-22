import { Message } from "@/domain/entities/Message";

export interface ChatRepository {
    sendMessage(message: Message): Promise<Message>;
}