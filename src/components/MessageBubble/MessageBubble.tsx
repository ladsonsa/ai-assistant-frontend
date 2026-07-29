import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

import styles from "./MessageBubble.module.css";

interface MessageBubbleProps {
    readonly message: Message;
}

export function MessageBubble({
    message,
}: MessageBubbleProps) {
    const isUser = message.role === MessageRole.USER;

    return (
        <div
            className={`${styles.container} ${
                isUser ? styles.user : styles.assistant
            }`}
        >
            <p className={styles.content}>
                {message.content}
            </p>
        </div>
    );
}