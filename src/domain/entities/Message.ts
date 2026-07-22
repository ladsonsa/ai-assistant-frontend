import { MessageRole } from "./MessageRole";

/**
 * Represents an individual message within a conversation.
 */
export class Message {
    /**
     * Initializes a new instance of the Message class.
     *
     * @param id The unique identifier for the message.
     * @param role The role of the entity that sent the message (e.g., user, assistant, or system).
     * @param content The text or payload content of the message.
     */
    public constructor(
        public readonly id: string,
        public readonly role: MessageRole,
        public readonly content: string,
    ) {}
}