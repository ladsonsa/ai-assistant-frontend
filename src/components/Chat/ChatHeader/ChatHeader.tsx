"use client";

import type { Theme } from "@/hooks/useTheme";

import styles from "./ChatHeader.module.css";

/**
 * Properties for the {@link ChatHeader} component.
 */
interface ChatHeaderProps {
    /** The active visual theme mode. */
    readonly theme: Theme;
    /** Callback function to toggle between visual themes. */
    readonly onToggleTheme: () => void;
}

/**
 * Renders the primary application header featuring the title and a button to toggle the visual theme.
 *
 * @param props The component props conforming to {@link ChatHeaderProps}.
 * @returns The rendered chat header element.
 */
export function ChatHeader({
    theme,
    onToggleTheme,
}: ChatHeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.appTitle}>
                Calculadora IA
            </h1>

            <button
                onClick={onToggleTheme}
                className={styles.themeButton}
                title="Alternar Tema"
                aria-label="Alternar tema"
            >
                {theme === "dark"
                    ? "☀️"
                    : "🌙"}
            </button>
        </header>
    );
}