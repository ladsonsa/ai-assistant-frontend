import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

import styles from "./MessageBubble.module.css";

/**
 * Props interface for the {@link MessageBubble} component.
 */
interface MessageBubbleProps {
    /**
     * The Message entity instance to be displayed within the bubble.
     */
    readonly message: Message;
}

/**
 * Component that renders an individual chat message bubble along with
 * a role-specific visual avatar (User vs Assistant).
 *
 * @param props The component properties containing the message domain entity.
 * @returns The rendered message bubble row component.
 */
export function MessageBubble({
    message,
}: MessageBubbleProps) {
    const isUser = message.role === MessageRole.USER;

    return (
        <div
            className={`${styles.messageRow} ${
                isUser ? styles.rowUser : styles.rowAssistant
            }`}
        >
            <div
                className={`${styles.avatar} ${
                    isUser ? styles.avatarUser : styles.avatarAssistant
                }`}
                aria-hidden="true"
            >
                {isUser ? (
                    <svg viewBox="0 0 24 24" fill="none" className={styles.iconSvg}>
                        <path
                            d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <path
                            d="M6 19C6 16.2386 8.68629 14 12 14C15.3137 14 18 16.2386 18 19"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" className={styles.iconSvg}>
                        <path
                            d="M12 2V4M12 20V22M4 12H2M22 12H20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            opacity="0.4"
                        />
                        <rect
                            x="5"
                            y="7"
                            width="14"
                            height="10"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        />
                        <circle cx="9" cy="12" r="1.25" fill="currentColor" />
                        <circle cx="15" cy="12" r="1.25" fill="currentColor" />
                    </svg>
                )}
            </div>

            <div
                className={`${styles.container} ${
                    isUser ? styles.user : styles.assistant
                }`}
            >
                <p className={styles.content}>
                    {message.content}
                </p>
            </div>
        </div>
    );
}