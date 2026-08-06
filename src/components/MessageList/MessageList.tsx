"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/domain/entities/Message";

import { MessageBubble } from "../MessageBubble/MessageBubble";

import styles from "./MessageList.module.css";

interface MessageListProps {
    readonly messages: readonly Message[];
}

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