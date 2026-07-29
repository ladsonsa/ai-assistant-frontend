"use client";

import { FormEvent, useState } from "react";

import styles from "./MessageInput.module.css";

interface MessageInputProps {
    readonly disabled: boolean;
    readonly onSend: (content: string) => Promise<void>;
}

export function MessageInput({
    disabled,
    onSend,
}: MessageInputProps) {
    const [content, setContent] = useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        const value = content.trim();

        if (!value) {
            return;
        }

        await onSend(value);

        setContent("");
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <input
                className={styles.input}
                type="text"
                value={content}
                placeholder="Type your message..."
                disabled={disabled}
                onChange={(event) => {
                    setContent(event.target.value);
                }}
            />

            <button
                className={styles.button}
                type="submit"
                disabled={disabled}
            >
                Send
            </button>
        </form>
    );
}