"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/domain/entities/Message";

import { MessageBubble } from "../MessageBubble/MessageBubble";

import styles from "./MessageList.module.css";

/**
 * Props interface for the {@link MessageList} component.
 */
interface MessageListProps {
    /**
     * An immutable array of Message entities to be rendered in sequential order.
     */
    readonly messages: readonly Message[];
}

/**
 * Component that renders a scrollable list of chat messages.
 * Automatically scrolls to the bottom of the container whenever new messages are appended.
 *
 * @param props The component properties containing the array of messages.
 * @returns The rendered message list element.
 */
export function MessageList({
    messages,
}: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={styles.container}>
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}