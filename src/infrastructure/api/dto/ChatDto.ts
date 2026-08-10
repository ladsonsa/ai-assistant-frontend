/**
 * Data Transfer Object representing an individual message payload in API requests/responses.
 */
export interface ChatMessageDto {
    /** The role of the entity that originated the message (e.g., 'user', 'assistant'). */
    readonly role: string;
    /** The text content of the message. */
    readonly content: string;
    /** Optional key-value metadata associated with the message payload. */
    readonly metadata?: Record<string, unknown>;
}

/**
 * Data Transfer Object representing the request body sent to the chat API endpoint.
 */
export interface ChatRequestDto {
    /** An immutable sequence of historical chat messages. */
    readonly history: readonly ChatMessageDto[];
}

/**
 * Data Transfer Object representing the response payload returned by the chat API endpoint.
 */
export interface ChatResponseDto {
    /** The generated text response content from the assistant. */
    readonly content: string;
    /** Optional key-value metadata returned alongside the response. */
    readonly metadata?: Record<string, unknown>;
}