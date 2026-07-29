import { Message } from "@/domain/entities/Message";

import { MessageBubble } from "../MessageBubble/MessageBubble";

import styles from "./MessageList.module.css";

interface MessageListProps {
    readonly messages: readonly Message[];
}

export function MessageList({
    messages,
}: MessageListProps) {
    return (
        <div className={styles.container}>
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    );
}