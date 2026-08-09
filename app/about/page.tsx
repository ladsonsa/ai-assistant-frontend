import Link from "next/link";
import styles from "@/styles/About.module.css";

/**
 * Base properties shared across all about section data types.
 */
interface BaseSection {
    /** The heading title for the section. */
    title: string;
}

/**
 * Section data variant containing plain paragraph text content.
 */
interface TextSection extends BaseSection {
    /** Discriminator identifier for text-based content. */
    type: "text";
    /** The main text content to render within the section paragraph. */
    content: string;
}

/**
 * Section data variant containing an ordered or unordered itemized list.
 */
interface ListSection extends BaseSection {
    /** Discriminator identifier for list-based content. */
    type: "list";
    /** Array of string items to be rendered as bullet points. */
    items: string[];
}

/**
 * Discriminated union type representing valid structural layouts for about page sections.
 */
type SectionData = TextSection | ListSection;

/**
 * Structured content sections detailing project overview, architectural principles,
 * technology stack, and engineering objectives.
 */
const ABOUT_SECTIONS: SectionData[] = [
    {
        title: "Visão Geral",
        type: "text",
        content: "O AI Assistant Frontend é uma aplicação web moderna construída com Next.js e TypeScript, projetada para demonstrar a aplicação de práticas profissionais de engenharia de software. O projeto possui uma arquitetura robusta que enfatiza manutenibilidade, escalabilidade e uma clara separação de responsabilidades.",
    },
    {
        title: "Arquitetura e Princípios",
        type: "list",
        items: [
            "Clean Architecture (Domínio, Aplicação, Infraestrutura e Apresentação)",
            "Princípios SOLID",
            "Injeção de Dependência através de composição",
            "Repository Pattern para abstração de infraestrutura",
            "Modelos de domínio fortemente tipados com TypeScript"
        ],
    },
    {
        title: "Tecnologias Frontend",
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
        title: "Backend e Infraestrutura",
        type: "list",
        items: [
            "Python & FastAPI",
            "Streamlit",
            "APIs da OpenAI & Google Gemini",
            "Docker & Docker Compose"
        ],
    },
    {
        title: "Objetivo do Projeto",
        type: "text",
        content: "Construir uma base de código orientada à produção que sirva tanto como um projeto acadêmico completo quanto como um exemplo de portfólio, demonstrando arquitetura frontend moderna e padrões limpos de engenharia.",
    },
];

/**
 * Static About page view component presenting architectural choices,
 * technical stack information, and project goals.
 *
 * @returns The rendered About page view.
 */
export default function AboutPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Sobre o Projeto</h1>

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
                        Voltar para o Início
                    </Link>
                </nav>
            </div>

            <Link
                href="/about/details"
                className={styles.secretLink}
                aria-label="Detalhes adicionais"
            >
                🏺
            </Link>
        </main>
    );
}