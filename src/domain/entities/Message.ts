export enum MessageRole {
    USER = "user",
    ASSISTANT = "assistant",
}

export interface Message {
    readonly id: string;
    readonly role: MessageRole;
    readonly content: string;
}