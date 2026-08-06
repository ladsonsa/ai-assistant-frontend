import Link from "next/link";

import styles from "@/styles/Home.module.css";

export default function HomePage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    AI Assistant Platform
                </h1>

                <p className={styles.description}>
                    AI-powered mathematical assistant built with
                    Next.js, TypeScript, FastAPI and Python.
                </p>

                <p className={styles.description}>
                    This project demonstrates the implementation
                    of a modern frontend consuming an AI backend
                    through a REST API while following Clean
                    Architecture and SOLID principles.
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