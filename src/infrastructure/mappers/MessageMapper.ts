import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRequest } from "@/infrastructure/api/dto/ChatRequest";
import { ChatResponse } from "@/infrastructure/api/dto/ChatResponse";

export class MessageMapper {
    public static toChatRequest(
        history: readonly Message[],
    ): ChatRequest {
        return {
            history: history.map((message) => ({
                role: message.role,
                content: message.content,
                metadata: message.metadata,
            })),
        };
    }

    public static toDomain(
        response: ChatResponse,
    ): Message {
        return new Message(
            crypto.randomUUID(),
            MessageRole.ASSISTANT,
            response.content,
            response.metadata,
        );
    }
}