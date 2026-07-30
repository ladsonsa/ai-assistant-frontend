/**
 * Defines the roles that an entity can take within a message context.
 */
export enum MessageRole {
    /** Indicates a message originating from the user. */
    USER = "user",

    /** Indicates a message originating from the assistant system. */
    ASSISTANT = "assistant",
}