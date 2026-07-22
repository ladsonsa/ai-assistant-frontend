import { MessageRole } from "./MessageRole";

export class Message {
    public constructor(
        public readonly id: string,
        public readonly role: MessageRole,
        public readonly content: string,
    ) {}
}