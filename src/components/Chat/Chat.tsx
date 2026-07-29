"use client";

import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { MessageList } from "@/components/MessageList/MessageList";
import { useChat } from "@/hooks/useChat";

import styles from "./Chat.module.css";

export function Chat() {
    const {
        messages,
        isLoading,
        error,
        sendMessage,
    } = useChat();

    return (
        <section className={styles.container}>
            <div className={styles.messages}>
                <MessageList
                    messages={messages}
                />

                {isLoading && (
                    <LoadingIndicator />
                )}

                {error && (
                    <p className={styles.error}>
                        {error}
                    </p>
                )}
            </div>

            <MessageInput
                disabled={isLoading}
                onSend={sendMessage}
            />
        </section>
    );
}