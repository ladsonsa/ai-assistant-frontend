"use client";

import { useMemo, useState, type MouseEvent } from "react";

import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";
import { ChatContextPanel } from "@/components/Chat/ChatContextPanel/ChatContextPanel";
import { ChatHeader } from "@/components/Chat/ChatHeader/ChatHeader";
import { ChatHistory } from "@/components/Chat/ChatHistory/ChatHistory";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { MessageList } from "@/components/MessageList/MessageList";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Chat.module.css";

/**
 * Interface representing an extracted numeric calculation result.
 */
interface Result {
    /**
     * Unique key identifier generated for the extracted result.
     */
    readonly id: string;

    /**
     * Extracted numeric string value.
     */
    readonly value: string;
}

/**
 * Extracts the last numeric value (integer or decimal) found within a message string.
 *
 * @param content The text content to search for numerical values.
 * @returns The last matched numeric string, or `null` if no match is found.
 */
const extractNumericResult = (
    content: string,
): string | null => {
    const matches = content.match(
        /-?\d+(?:[.,]\d+)?/g,
    );

    if (!matches || matches.length === 0) {
        return null;
    }

    return matches[matches.length - 1];
};

const extractRecentResults = (
    messages: readonly {
        readonly id: string;
        readonly role: string;
        readonly content: string;
    }[],
): readonly Result[] =>
    messages
        .filter(
            (message) =>
                message.role === "assistant",
        )
        .map((message, index) => {
            const value = extractNumericResult(
                message.content,
            );

            if (!value) {
                return null;
            }

            return {
                id: `${message.id}-${index}`,
                value,
            };
        })
        .filter(
            (
                result,
            ): result is Result =>
                result !== null,
        )
        .reverse();

/**
 * Main chat page component featuring conversation session management,
 * theme toggling, and a contextual result panel.
 *
 * @returns The rendered Chat view component.
 */
export function Chat() {
    const {
        conversations,
        messages,
        currentConversationId,
        isLoading,
        error,
        sendMessage,
        createConversation,
        selectConversation,
        deleteConversation,
        clearConversations,
    } = useChat();

    const { theme, toggleTheme } = useTheme();

    const [isLeftOpen, setIsLeftOpen] = useState(true);

    /**
     * Currently selected conversation.
     *
     * The right contextual panel uses this value to identify
     * which conversation the displayed results belong to.
     */
    const currentConversation = useMemo(
        () =>
            conversations.find(
                (conversation) =>
                    conversation.id ===
                    currentConversationId,
            ) ?? null,
        [conversations, currentConversationId],
    );

    /**
     * Creates a new conversation and selects it.
     */
    const handleNewChat = () => {
        const newId = Date.now().toString();
        createConversation(newId);
    };

    /**
     * Removes a conversation from the history and its message state.
     */
    const handleDeleteChat = (
        id: string,
        event: MouseEvent,
    ) => {
        event.stopPropagation();
        deleteConversation(id);
    };

    /**
     * Extracts numerical results from assistant messages
     * belonging to the currently selected conversation.
     */
    const recentResults = useMemo(
        () => extractRecentResults(messages),
        [messages],
    );

    return (
        <div
            className={`${styles.layout} ${
                theme === "light"
                    ? styles.lightTheme
                    : ""
            }`}
        >
            <ChatHistory
                conversations={conversations}
                currentConversationId={
                    currentConversationId
                }
                onNewChat={handleNewChat}
                onSelectChat={selectConversation}
                onDeleteChat={handleDeleteChat}
                onDeleteAllChats={clearConversations}
                isOpen={isLeftOpen}
            />

            <button
                onClick={() =>
                    setIsLeftOpen(
                        (prev) => !prev,
                    )
                }
                className={`${styles.toggleLeft} ${
                    !isLeftOpen
                        ? styles.closed
                        : ""
                }`}
                title="Alternar Barra Lateral Esquerda"
                aria-label="Alternar barra lateral esquerda"
                aria-expanded={isLeftOpen}
            >
                {isLeftOpen ? "◀" : "▶"}
            </button>

            <section
                className={styles.container}
            >
                <ChatHeader
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />

                <div
                    className={styles.messages}
                >
                    <MessageList
                        messages={messages}
                    />

                    {isLoading && (
                        <LoadingIndicator />
                    )}

                    {error && (
                        <p
                            className={
                                styles.error
                            }
                        >
                            {error}
                        </p>
                    )}
                </div>

                <MessageInput
                    disabled={
                        isLoading ||
                        !currentConversationId
                    }
                    onSend={sendMessage}
                />
            </section>

            <ChatContextPanel
                conversationTitle={
                    currentConversation?.title ?? null
                }
                results={recentResults}
            />
        </div>
    );
}