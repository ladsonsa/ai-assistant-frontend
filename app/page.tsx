"use client";

import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className={`${styles.main} ${theme === "light" ? styles.lightTheme : ""}`}>
            <button
                type="button"
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Alternar tema"
            >
                {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <section className={styles.hero}>
                <h1 className={styles.title}>
                    AI Assistant Platform
                </h1>

                <p className={styles.description}>
                    AI-powered mathematical assistant built with
                    Next.js, TypeScript, FastAPI and Python.
                </p>

                <div className={styles.buttonGroup}>
                    <Link href="/chat" className={styles.button}>
                        Start Chat
                    </Link>

                    <Link href="/about" className={styles.button}>
                        About
                    </Link>
                </div>
            </section>
        </main>
    );
}