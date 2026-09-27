"use client";

import { useMemo, useState, type MouseEvent } from "react";

import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { MessageList } from "@/components/MessageList/MessageList";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Chat.module.css";


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
                    conversation.id === currentConversationId,
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
     * Handles switching between conversations.
     */
    const handleSelectChat = (id: string) => {
        selectConversation(id);
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
     * Clears all conversations.
     */
    const handleDeleteAllChats = () => {
        clearConversations();
    };
    
    /**
     * Extracts numerical results from assistant messages
     * belonging to the currently selected conversation.
     */
    const recentResults = useMemo<readonly Result[]>(
        () =>
            messages
                .filter(
                    (message) =>
                        message.role === "assistant",
                )
                .map((message, index) => {
                    const value =
                        extractNumericResult(
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
                .reverse(),
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
            <aside
                className={`${styles.sidebar} ${
                    !isLeftOpen
                        ? styles.closed
                        : ""
                }`}
            >
                <button
                    onClick={handleNewChat}
                    className={
                        styles.newChatButton
                    }
                >
                    + Nova Conversa
                </button>

                <div
                    className={
                        styles.historyList
                    }
                >
                    {conversations.map(
                        (conversation) => (
                            <div
                                key={
                                    conversation.id
                                }
                                onClick={() =>
                                    handleSelectChat(
                                        conversation.id,
                                    )
                                }
                                className={`${
                                    styles.historyItem
                                } ${
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
                                    {
                                        conversation.title
                                    }
                                </span>

                                <button
                                    onClick={(
                                        event,
                                    ) =>
                                        handleDeleteChat(
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
                        onClick={
                            handleDeleteAllChats
                        }
                        className={
                            styles.deleteAllButton
                        }
                    >
                        Excluir Todas
                    </button>
                )}
            </aside>

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
                <header
                    className={styles.header}
                >
                    <h1
                        className={
                            styles.appTitle
                        }
                    >
                        Calculadora IA
                    </h1>

                    <button
                        onClick={toggleTheme}
                        className={
                            styles.themeButton
                        }
                        title="Alternar Tema"
                        aria-label="Alternar tema"
                    >
                        {theme === "dark"
                            ? "☀️"
                            : "🌙"}
                    </button>
                </header>

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

            <aside
                className={
                    styles.rightSidebar
                }
                aria-label="Contexto da conversa"
            >
                <div
                    className={
                        styles.rightSidebarHeader
                    }
                >
                    <span
                        className={
                            styles.panelEyebrow
                        }
                    >
                        CONTEXTO
                    </span>

                    <h2
                        className={
                            styles.rightSidebarTitle
                        }
                    >
                        {currentConversation?.title ??
                            "Nenhuma conversa"}
                    </h2>
                </div>

                <div
                    className={
                        styles.contextSummary
                    }
                >
                    <span
                        className={
                            styles.contextLabel
                        }
                    >
                        Resultados encontrados
                    </span>

                    <strong
                        className={
                            styles.contextCount
                        }
                    >
                        {recentResults.length}
                    </strong>
                </div>

                <section
                    className={
                        styles.boxSection
                    }
                >
                    <h3>
                        Últimos resultados
                    </h3>

                    <div
                        className={
                            styles.resultsList
                        }
                    >
                        {recentResults.length ===
                        0 ? (
                            <div
                                className={
                                    styles.emptyResult
                                }
                            >
                                <strong>
                                    Nenhum resultado
                                    ainda.
                                </strong>

                                <span>
                                    Os resultados desta
                                    conversa aparecerão
                                    aqui.
                                </span>
                            </div>
                        ) : (
                            recentResults.map(
                                (
                                    result,
                                    index,
                                ) => (
                                    <article
                                        key={
                                            result.id
                                        }
                                        className={
                                            styles.resultBox
                                        }
                                    >
                                        <div
                                            className={
                                                styles.resultMeta
                                            }
                                        >
                                            <span>
                                                Resultado #
                                                {recentResults.length -
                                                    index}
                                            </span>

                                            <span>
                                                {
                                                    currentConversation?.title
                                                }
                                            </span>
                                        </div>

                                        <strong
                                            className={
                                                styles.resultValue
                                            }
                                        >
                                            {
                                                result.value
                                            }
                                        </strong>
                                    </article>
                                ),
                            )
                        )}
                    </div>
                </section>
            </aside>
        </div>
    );
}