import Link from "next/link";

export default function HomePage() {
    return (
        <main>
            <section>
                <h1>AI Assistant Platform</h1>

                <p>
                    An AI-powered mathematical assistant built with
                    Clean Architecture, Next.js and Python.
                </p>

                <p>
                    This project demonstrates a complete frontend and backend
                    architecture using REST communication, dependency injection
                    and repository pattern.
                </p>

                <Link href="/chat">
                    Start Chat
                </Link>
            </section>

            <footer>
                <Link href="/about">
                    About
                </Link>
            </footer>
        </main>
    );
}