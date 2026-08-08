"use client";

import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <main
            className={`${styles.main} ${
                theme === "light" ? styles.lightTheme : ""
            }`}
        >
            <button
                type="button"
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Alternar tema"
            >
                {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <section className={styles.hero}>
                <span className={styles.badge}>
                    AI Assistant Platform
                </span>

                <h1 className={styles.title}>
                    Inteligência artificial para
                    <span> cálculos mais simples.</span>
                </h1>

                <p className={styles.description}>
                    Uma calculadora inteligente capaz de compreender
                    suas solicitações em linguagem natural, realizar
                    cálculos matemáticos e apresentar os resultados
                    de forma clara e objetiva.
                </p>

                <div className={styles.buttonGroup}>
                    <Link href="/chat" className={styles.button}>
                        Start Chat
                    </Link>

                    <Link href="/about" className={styles.button}>
                        About
                    </Link>
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <strong>Natural Language</strong>
                        <span>
                            Envie seus cálculos usando linguagem natural.
                        </span>
                    </div>

                    <div className={styles.feature}>
                        <strong>AI Powered</strong>
                        <span>
                            Integração com um backend de inteligência artificial.
                        </span>
                    </div>

                    <div className={styles.feature}>
                        <strong>Conversation History</strong>
                        <span>
                            Acompanhe os cálculos realizados durante a sessão.
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}