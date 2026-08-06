"use client";

import { useState, useEffect } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { MessageList } from "@/components/MessageList/MessageList";
import { useChat } from "@/hooks/useChat";

import styles from "./Chat.module.css";

interface Conversation {
    readonly id: string;
    readonly title: string;
}

export function Chat() {
    const {
        messages,
        isLoading,
        error,
        sendMessage,
    } = useChat();

    const [isLeftOpen, setIsLeftOpen] = useState(true);
    const [isRightOpen, setIsRightOpen] = useState(true);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [conversations, setConversations] = useState<readonly Conversation[]>([
        { id: "1", title: "Cálculo de porcentagem" },
        { id: "2", title: "Divisão e soma" }
    ]);
    const [currentChatId, setCurrentChatId] = useState<string>("1");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleNewChat = () => {
        const newId = Date.now().toString();
        setConversations(prev => [{ id: newId, title: "Nova conversa" }, ...prev]);
        setCurrentChatId(newId);
    };

    const handleDeleteChat = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = conversations.filter(conv => conv.id !== id);
        setConversations(updated);
        if (currentChatId === id && updated.length > 0) {
            setCurrentChatId(updated[0].id);
        }
    };

    const handleDeleteAllChats = () => {
        setConversations([]);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const lastAssistantMessage = messages
        .filter(m => m.role === "assistant")
        .slice(-1)[0]?.content || "Nenhum cálculo recente.";

    return (
        <div className={`${styles.layout} ${theme === "light" ? styles.lightTheme : ""}`}>
            <aside className={`${styles.sidebar} ${!isLeftOpen ? styles.closed : ""}`}>
                <button onClick={handleNewChat} className={styles.newChatButton}>
                    + Nova Conversa
                </button>
                <div className={styles.historyList}>
                    {conversations.map(conv => (
                        <div 
                            key={conv.id} 
                            onClick={() => setCurrentChatId(conv.id)}
                            className={`${styles.historyItem} ${conv.id === currentChatId ? styles.active : ""}`}
                        >
                            <span className={styles.historyTitle}>{conv.title}</span>
                            <button 
                                onClick={(e) => handleDeleteChat(conv.id, e)}
                                className={styles.deleteButton}
                                title="Apagar conversa"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                {conversations.length > 0 && (
                    <button onClick={handleDeleteAllChats} className={styles.deleteAllButton}>
                        Apagar Todas
                    </button>
                )}
            </aside>

            <button 
                onClick={() => setIsLeftOpen(!isLeftOpen)} 
                className={`${styles.toggleLeft} ${!isLeftOpen ? styles.closed : ""}`}
                title="Alternar Sidebar Esquerda"
            >
                {isLeftOpen ? "◀" : "▶"}
            </button>

            <section className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.appTitle}>Calculadora IA</h1>
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
                    {error && <p className={styles.error}>{error}</p>}
                </div>

                <MessageInput disabled={isLoading} onSend={sendMessage} />
            </section>

            <button 
                onClick={() => setIsRightOpen(!isRightOpen)} 
                className={`${styles.toggleRight} ${!isRightOpen ? styles.closed : ""}`}
                title="Alternar Painel Direito"
            >
                {isRightOpen ? "▶" : "◀"}
            </button>

            <aside className={`${styles.rightSidebar} ${!isRightOpen ? styles.closed : ""}`}>
                <div className={styles.boxSection}>
                    <h3>Último Resultado</h3>
                    <div className={styles.resultBox}>
                        {lastAssistantMessage}
                    </div>
                </div>
            </aside>
        </div>
    );
}