"use client";

import { FormEvent, useState, useRef } from "react";

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
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        const value = content.trim();

        if (!value) {
            return;
        }

        setContent("");
        
        await onSend(value);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <input
                ref={inputRef}
                className={styles.input}
                type="text"
                value={content}
                placeholder="Digite sua mensagem..."
                disabled={disabled}
                autoFocus
                onChange={(event) => {
                    setContent(event.target.value);
                }}
            />

            <button
                className={styles.button}
                type="submit"
                disabled={disabled}
            >
                Enviar
            </button>
        </form>
    );
}