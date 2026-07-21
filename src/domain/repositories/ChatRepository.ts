import { Message } from "../entities/Message";

export interface ChatRepository {
    sendMessage(message: Message): Promise<Message>;
}