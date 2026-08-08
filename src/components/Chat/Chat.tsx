"use client";

import { useMemo, useState } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { MessageList } from "@/components/MessageList/MessageList";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Chat.module.css";

interface Conversation {
    readonly id: string;
    readonly title: string;
}

interface Result {
    readonly id: string;
    readonly value: string;
}

const extractNumericResult = (content: string): string | null => {
    const matches = content.match(/-?\d+(?:[.,]\d+)?/g);

    if (!matches || matches.length === 0) {
        return null;
    }

    return matches[matches.length - 1];
};

export function Chat() {
    const { messages, isLoading, error, sendMessage } = useChat();
    const { theme, toggleTheme } = useTheme();

    const [isLeftOpen, setIsLeftOpen] = useState(true);
    const [isRightOpen, setIsRightOpen] = useState(true);
    const [conversations, setConversations] = useState<
        readonly Conversation[]
    >([
        { id: "1", title: "Conversa principal" },
    ]);
    const [currentChatId, setCurrentChatId] = useState<string>("1");

    const handleNewChat = () => {
        const newId = Date.now().toString();
        const nextNumber = conversations.length + 1;

        const newConversation: Conversation = {
            id: newId,
            title: `Conversa ${nextNumber}`,
        };

        setConversations((prev) => [newConversation, ...prev]);
        setCurrentChatId(newId);
    };

    const handleDeleteChat = (
        id: string,
        event: React.MouseEvent,
    ) => {
        event.stopPropagation();

        setConversations((prev) => {
            const updated = prev.filter(
                (conversation) => conversation.id !== id,
            );

            if (currentChatId === id) {
                setCurrentChatId(updated[0]?.id || "");
            }

            return updated;
        });
    };

    const handleDeleteAllChats = () => {
        setConversations([]);
        setCurrentChatId("");
    };

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
                            onClick={() => setCurrentChatId(conversation.id)}
                            className={`${styles.historyItem} ${
                                conversation.id === currentChatId
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
                                title="Apagar conversa"
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
                        Apagar Todas
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
                title="Alternar Sidebar Esquerda"
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
                    disabled={isLoading}
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