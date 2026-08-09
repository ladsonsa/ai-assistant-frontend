import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { ChatRequest } from "@/infrastructure/api/dto/ChatRequest";
import { ChatResponse } from "@/infrastructure/api/dto/ChatResponse";

/**
 * Utility mapper class responsible for converting between domain entities
 * and infrastructure Data Transfer Objects (DTOs) for chat interactions.
 */
export class MessageMapper {
    /**
     * Maps an immutable array of domain Message entities into a ChatRequest DTO payload.
     *
     * @param history An immutable array of Message domain entities representing the chat history.
     * @returns A ChatRequest DTO populated with formatted message items.
     */
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

    /**
     * Converts a ChatResponse API DTO into a newly constructed domain Message entity.
     *
     * @param response The ChatResponse DTO returned from the API infrastructure layer.
     * @returns A new Message domain entity assigned with an assistant role and generated UUID.
     */
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