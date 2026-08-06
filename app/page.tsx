import Link from "next/link";

export default function HomePage() {
    return (
        <main>
            <h1>AI Assistant Platform</h1>

            <p>
                Frontend application built with Next.js that consumes a Python
                backend through a REST API.
            </p>

            <Link href="/chat">
                Start Chat
            </Link>

            <Link href="/about">
                About
            </Link>
        </main>
    );
}