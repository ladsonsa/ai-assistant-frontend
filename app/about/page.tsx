import Link from "next/link";
import styles from "@/styles/About.module.css";

// Tipagem estrita para garantir segurança e escalabilidade (Padrão de Mercado)
interface BaseSection {
    title: string;
}

interface TextSection extends BaseSection {
    type: "text";
    content: string;
}

interface ListSection extends BaseSection {
    type: "list";
    items: string[];
}

type SectionData = TextSection | ListSection;

// Dados sincronizados com a documentação oficial do projeto (README)
const ABOUT_SECTIONS: SectionData[] = [
    {
        title: "Overview",
        type: "text",
        content: "AI Assistant Frontend is a modern web application built with Next.js and TypeScript, designed to demonstrate the application of professional software engineering practices. It features a robust architecture emphasizing maintainability, scalability, and clear separation of responsibilities.",
    },
    {
        title: "Architecture & Principles",
        type: "list",
        items: [
            "Clean Architecture (Domain, Application, Infrastructure, Presentation)",
            "SOLID Principles",
            "Dependency Injection through composition",
            "Repository Pattern for infrastructure abstraction",
            "Strongly typed domain models using TypeScript"
        ],
    },
    {
        title: "Frontend Stack",
        type: "list",
        items: [
            "Next.js (App Router)",
            "React",
            "TypeScript",
            "CSS Modules",
            "Fetch API"
        ],
    },
    {
        title: "Backend & Infrastructure",
        type: "list",
        items: [
            "Python & FastAPI",
            "Streamlit",
            "OpenAI & Google Gemini APIs",
            "Docker & Docker Compose"
        ],
    },
    {
        title: "Project Goal",
        type: "text",
        content: "Build a production-oriented codebase that serves both as a complete academic project and as a portfolio example demonstrating modern frontend architecture and clean engineering standards.",
    },
];

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>About the Project</h1>

                {/* Renderização dinâmica baseada nas seções estruturadas */}
                {ABOUT_SECTIONS.map((section, index) => (
                    <section key={index} className={styles.section}>
                        <h2>{section.title}</h2>
                        {section.type === "text" ? (
                            <p>{section.content}</p>
                        ) : (
                            <ul>
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                <nav className={styles.navigation}>
                    <Link href="/" className={styles.backButton}>
                        Back to Home
                    </Link>
                </nav>
            </div>

            <Link
                href="/about/details"
                className={styles.secretLink}
                aria-label="Additional details"
            >
                🏺
            </Link>
        </main>
    );
}