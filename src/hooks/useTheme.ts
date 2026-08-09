"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Retrieves the current theme snapshot from client storage or browser color scheme preferences.
 *
 * @returns The resolved theme string ("light" or "dark"). Defaults to "dark" on SSR.
 */
const getSnapshot = () => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("app-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

/**
 * Subscribes to window storage events to synchronize state changes across tabs or browser sessions.
 *
 * @param callback The subscriber function to trigger on state update.
 * @returns An unsubscribe cleanup function.
 */
const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

/**
 * Custom React hook for managing and toggling the application visual theme state.
 * Synchronizes with localStorage and system preferences via `useSyncExternalStore`.
 *
 * @returns An object containing the active `theme` ("dark" | "light") and a `toggleTheme` function.
 */
export function useTheme() {

    const theme = useSyncExternalStore(
        subscribe,
        getSnapshot,
        () => "dark"
    ) as "dark" | "light";

    useEffect(() => {
        if (theme === "light") {
            document.body.classList.add("light");
            localStorage.setItem("app-theme", "light");
        } else {
            document.body.classList.remove("light");
            localStorage.setItem("app-theme", "dark");
        }
    }, [theme]);

    /**
     * Toggles the theme between "light" and "dark", updates DOM classes, and dispatches a storage event.
     */
    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("app-theme", nextTheme);
        window.dispatchEvent(new Event("storage"));
        
        if (nextTheme === "light") {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }
    };

    return { theme, toggleTheme };
}