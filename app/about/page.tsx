import Link from "next/link";

import styles from "@/styles/About.module.css";

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    About the Project
                </h1>

                <section className={styles.section}>
                    <h2>Overview</h2>

                    <p>
                        AI Assistant Platform is a full-stack application that
                        demonstrates the integration between a modern frontend
                        built with Next.js and an AI backend implemented in
                        Python.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Architecture</h2>

                    <ul>
                        <li>Clean Architecture</li>
                        <li>SOLID Principles</li>
                        <li>Repository Pattern</li>
                        <li>Dependency Injection</li>
                        <li>DTO Pattern</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Frontend</h2>

                    <ul>
                        <li>Next.js</li>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>CSS Modules</li>
                        <li>Fetch API</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Backend</h2>

                    <ul>
                        <li>Python</li>
                        <li>FastAPI</li>
                        <li>Streamlit</li>
                        <li>OpenAI</li>
                        <li>Google Gemini</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Infrastructure</h2>

                    <ul>
                        <li>Docker</li>
                        <li>Docker Compose</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Project Goal</h2>

                    <p>
                        Build a maintainable and scalable AI assistant while
                        applying modern software engineering practices and clean
                        architectural principles.
                    </p>
                </section>

                <nav className={styles.navigation}>
                    <Link
                        href="/"
                        className={styles.backButton}
                    >
                        Back to Home
                    </Link>
                </nav>
            </div>
        </main>
    );
}