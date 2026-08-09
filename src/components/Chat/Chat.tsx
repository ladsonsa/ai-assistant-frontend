"use client";

import { useMemo, useState } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { MessageList } from "@/components/MessageList/MessageList";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Chat.module.css";

/**
 * Interface representing a chat conversation record.
 */
interface Conversation {
    /** Unique identifier for the conversation. */
    readonly id: string;
    /** Display title for the conversation history entry. */
    readonly title: string;
}

/**
 * Interface representing an extracted numeric calculation result.
 */
interface Result {
    /** Unique key identifier generated for the extracted result. */
    readonly id: string;
    /** Extracted numeric string value. */
    readonly value: string;
}

/**
 * Extracts the last numeric value (integer or decimal) found within a message string.
 *
 * @param content The text content to search for numerical values.
 * @returns The last matched numeric string, or `null` if no match is found.
 */
const extractNumericResult = (content: string): string | null => {
    const matches = content.match(/-?\d+(?:[.,]\d+)?/g);

    if (!matches || matches.length === 0) {
        return null;
    }

    return matches[matches.length - 1];
};

/**
 * Main chat page component featuring collapsible sidebars, conversation session management,
 * theme toggling, and an extracted numerical result panel.
 *
 * @returns The rendered Chat view component.
 */
export function Chat() {
    const {
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
    const [isRightOpen, setIsRightOpen] = useState(true);
    const [conversations, setConversations] = useState<
        readonly Conversation[]
    >([
        { id: "1", title: "Conversa principal" },
    ]);

    /**
     * Creates a new conversation item and sets it as the currently active chat in hook state.
     */
    const handleNewChat = () => {
        const newId = Date.now().toString();
        const nextNumber = conversations.length + 1;

        const newConversation: Conversation = {
            id: newId,
            title: `Conversa ${nextNumber}`,
        };

        setConversations((prev) => [newConversation, ...prev]);
        createConversation(newId);
    };

    /**
     * Handles switching active conversation.
     */
    const handleSelectChat = (id: string) => {
        selectConversation(id);
    };

    /**
     * Removes a specific conversation from the history list by its identifier and hook state.
     *
     * @param id The unique identifier of the conversation to delete.
     * @param event Mouse event object to stop event bubbling.
     */
    const handleDeleteChat = (
        id: string,
        event: React.MouseEvent,
    ) => {
        event.stopPropagation();

        deleteConversation(id);

        setConversations((prev) => {
            const updated = prev.filter(
                (conversation) => conversation.id !== id,
            );

            if (currentConversationId === id) {
                const nextChatId = updated[0]?.id || "";
                if (nextChatId) {
                    selectConversation(nextChatId);
                }
            }

            return updated;
        });
    };

    /**
     * Clears all conversations from UI and resets state in hook.
     */
    const handleDeleteAllChats = () => {
        clearConversations();
        setConversations([]);
    };

    /**
     * Extracts and memoizes recent numerical calculation results from assistant messages.
     */
    const recentResults = useMemo<readonly Result[]>(() => {
        return messages
            .filter((message) => message.role === "assistant")
            .map((message, index) => {
                const value = extractNumericResult(message.content);

                if (!value) {
                    return null;
                }

                return {
                    id: `${index}-${value}`,
                    value,
                };
            })
            .filter((result): result is Result => result !== null)
            .reverse();
    }, [messages]);

    return (
        <div
            className={`${styles.layout} ${
                theme === "light" ? styles.lightTheme : ""
            }`}
        >
            <aside
                className={`${styles.sidebar} ${
                    !isLeftOpen ? styles.closed : ""
                }`}
            >
                <button
                    onClick={handleNewChat}
                    className={styles.newChatButton}
                >
                    + Nova Conversa
                </button>

                <div className={styles.historyList}>
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => handleSelectChat(conversation.id)}
                            className={`${styles.historyItem} ${
                                conversation.id === currentConversationId
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <span className={styles.historyTitle}>
                                {conversation.title}
                            </span>

                            <button
                                onClick={(event) =>
                                    handleDeleteChat(
                                        conversation.id,
                                        event,
                                    )
                                }
                                className={styles.deleteButton}
                                title="Excluir conversa"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {conversations.length > 0 && (
                    <button
                        onClick={handleDeleteAllChats}
                        className={styles.deleteAllButton}
                    >
                        Excluir Todas
                    </button>
                )}
            </aside>

            <button
                onClick={() =>
                    setIsLeftOpen((prev) => !prev)
                }
                className={`${styles.toggleLeft} ${
                    !isLeftOpen ? styles.closed : ""
                }`}
                title="Alternar Barra Lateral Esquerda"
            >
                {isLeftOpen ? "◀" : "▶"}
            </button>

            <section className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.appTitle}>
                        Calculadora IA
                    </h1>

                    <button
                        onClick={toggleTheme}
                        className={styles.themeButton}
                        title="Alternar Tema"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </header>

                <div className={styles.messages}>
                    <MessageList messages={messages} />

                    {isLoading && <LoadingIndicator />}

                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}
                </div>

                <MessageInput
                    disabled={isLoading || !currentConversationId}
                    onSend={sendMessage}
                />
            </section>

            <button
                onClick={() =>
                    setIsRightOpen((prev) => !prev)
                }
                className={`${styles.toggleRight} ${
                    !isRightOpen ? styles.closed : ""
                }`}
                title="Alternar Painel Direito"
            >
                {isRightOpen ? "▶" : "◀"}
            </button>

            <aside
                className={`${styles.rightSidebar} ${
                    !isRightOpen ? styles.closed : ""
                }`}
            >
                <div className={styles.boxSection}>
                    <h3>Últimos Resultados</h3>

                    <div className={styles.resultsList}>
                        {recentResults.length === 0 ? (
                            <div className={styles.resultBox}>
                                Nenhum cálculo recente.
                            </div>
                        ) : (
                            recentResults.map((result) => (
                                <div
                                    key={result.id}
                                    className={styles.resultBox}
                                >
                                    {result.value}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );
}