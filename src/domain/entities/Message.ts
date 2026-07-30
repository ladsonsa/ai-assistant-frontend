import { MessageRole } from "./MessageRole";

/**
 * Represents an individual message within a conversation session, including optional payload metadata.
 */
export class Message {
    /**
     * Initializes a new instance of the Message class.
     *
     * @param id The unique identifier for the message.
     * @param role The role of the entity that sent the message (e.g., user or assistant).
     * @param content The textual content or body of the message.
     * @param metadata Optional key-value record containing supplementary payload or context data. Defaults to an empty object.
     */
    public constructor(
        public readonly id: string,
        public readonly role: MessageRole,
        public readonly content: string,
        public readonly metadata: Readonly<Record<string, unknown>> = {},
    ) {}
}