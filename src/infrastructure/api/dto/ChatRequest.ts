/**
 * Data Transfer Object (DTO) representing a payload request containing conversation history.
 */
export interface ChatRequest {
    /**
     * An immutable array of message objects representing the complete conversation context.
     */
    readonly history: readonly {
        /** The role associated with the message author (e.g., "user", "assistant"). */
        role: string;
        /** The text content of the message. */
        content: string;
        /** Additional read-only metadata attributes associated with the message context. */
        metadata: Readonly<Record<string, unknown>>;
    }[];
}