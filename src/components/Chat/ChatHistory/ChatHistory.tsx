"use client";

import type { MouseEvent } from "react";

import styles from "./ChatHistory.module.css";

/**
 * Represents a conversation displayed in the chat history.
 */
interface Conversation {
    /**
     * The unique identifier of the conversation.
     */
    readonly id: string;

    /**
     * The display title of the conversation.
     */
    readonly title: string;
}

/**
 * Defines the properties required to render the chat history.
 */
interface ChatHistoryProps {
    /**
     * The conversations available in the chat history.
     */
    readonly conversations: readonly Conversation[];

    /**
     * The identifier of the currently selected conversation,
     * or `null` when none is selected.
     */
    readonly currentConversationId: string | null;

    /**
     * Handles the creation of a new conversation.
     */
    readonly onNewChat: () => void;

    /**
     * Handles the selection of a conversation by its identifier.
     */
    readonly onSelectChat: (id: string) => void;

    /**
     * Handles the deletion of a conversation and receives
     * the originating mouse event.
     */
    readonly onDeleteChat: (
        id: string,
        event: MouseEvent,
    ) => void;

    /**
     * Handles the deletion of all conversations.
     */
    readonly onDeleteAllChats: () => void;

    /**
     * Controls whether the chat history sidebar is visible.
     */
    readonly isOpen: boolean;
}

/**
 * Renders the conversation history and controls for
 * creating and deleting chats.
 */
export function ChatHistory({
    conversations,
    currentConversationId,
    onNewChat,
    onSelectChat,
    onDeleteChat,
    onDeleteAllChats,
    isOpen,
}: ChatHistoryProps) {
    return (
        <aside
            className={`${styles.sidebar} ${
                !isOpen ? styles.closed : ""
            }`}
        >
            <button
                onClick={onNewChat}
                className={styles.newChatButton}
            >
                + Nova Conversa
            </button>

            <div className={styles.historyList}>
                {conversations.map(
                    (conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() =>
                                onSelectChat(
                                    conversation.id,
                                )
                            }
                            className={`${styles.historyItem} ${
                                conversation.id ===
                                currentConversationId
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <span
                                className={
                                    styles.historyTitle
                                }
                            >
                                {conversation.title}
                            </span>

                            <button
                                onClick={(event) =>
                                    onDeleteChat(
                                        conversation.id,
                                        event,
                                    )
                                }
                                className={
                                    styles.deleteButton
                                }
                                title="Excluir conversa"
                            >
                                ×
                            </button>
                        </div>
                    ),
                )}
            </div>

            {conversations.length > 0 && (
                <button
                    onClick={onDeleteAllChats}
                    className={
                        styles.deleteAllButton
                    }
                >
                    Excluir Todas
                </button>
            )}
        </aside>
    );
}