"use client";

import { FormEvent, useState, useRef } from "react";

import styles from "./MessageInput.module.css";

/**
 * Props interface for the {@link MessageInput} component.
 */
interface MessageInputProps {
    /**
     * Indicates whether the form inputs and buttons are disabled (e.g., while waiting for a response).
     */
    readonly disabled: boolean;
    /**
     * Callback function triggered when a non-empty message is submitted by the user.
     *
     * @param content The submitted message text content.
     */
    readonly onSend: (content: string) => Promise<void>;
}

/**
 * Form component that handles user text input and message submission for the chat interface.
 * Automatically clears the input field upon submission and restores focus afterwards.
 *
 * @param props The component properties containing disable status and submit handler.
 * @returns The rendered input form component.
 */
export function MessageInput({
    disabled,
    onSend,
}: MessageInputProps) {
    const [content, setContent] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Handles the form submission event, trims user input, triggers the onSend callback,
     * and resets input focus.
     *
     * @param event The form submission event object.
     */
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