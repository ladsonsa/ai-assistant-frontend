import Link from "next/link";

export default function AboutPage() {
    return (
        <main>
            <h1>About the Project</h1>

            <section>
                <h2>Overview</h2>

                <p>
                    AI Assistant Platform is a full-stack application composed
                    of a Next.js frontend and a Python backend focused on
                    mathematical conversations powered by Large Language Models.
                </p>
            </section>

            <section>
                <h2>Architecture</h2>

                <ul>
                    <li>Clean Architecture</li>
                    <li>SOLID Principles</li>
                    <li>Repository Pattern</li>
                    <li>Dependency Injection</li>
                    <li>DTO Pattern</li>
                </ul>
            </section>

            <section>
                <h2>Frontend</h2>

                <ul>
                    <li>Next.js</li>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>CSS Modules</li>
                    <li>Fetch API</li>
                </ul>
            </section>

            <section>
                <h2>Backend</h2>

                <ul>
                    <li>Python</li>
                    <li>FastAPI</li>
                    <li>Streamlit</li>
                    <li>OpenAI</li>
                    <li>Google Gemini</li>
                </ul>
            </section>

            <section>
                <h2>Infrastructure</h2>

                <ul>
                    <li>Docker</li>
                    <li>Docker Compose</li>
                </ul>
            </section>

            <section>
                <h2>Project Goal</h2>

                <p>
                    Demonstrate the implementation of a modern frontend
                    communicating with an AI backend while following software
                    engineering best practices.
                </p>
            </section>

            <nav>
                <Link href="/">
                    Back to Home
                </Link>
            </nav>
        </main>
    );
}