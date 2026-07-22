/**
 * Data Transfer Object (DTO) representing a request to send a chat message.
 */
export interface ChatRequest {
    /**
     * The textual content of the message to be transmitted.
     */
    readonly message: string;
}