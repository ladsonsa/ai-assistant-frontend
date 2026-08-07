"use client";

import { useEffect, useSyncExternalStore } from "react";

// Função para ler o tema do localStorage ou prefers-color-scheme sem quebrar o SSR
const getSnapshot = () => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("app-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

export function useTheme() {
    // useSyncExternalStore é a API moderna recomendada pelo React para sincronizar com o localStorage sem disparar warnings de cascading render
    const theme = useSyncExternalStore(
        subscribe,
        getSnapshot,
        () => "dark" // Valor padrão para o servidor (SSR)
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

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("app-theme", nextTheme);
        // Dispara o evento manualmente para atualizar abas/componentes se necessário
        window.dispatchEvent(new Event("storage"));
        
        if (nextTheme === "light") {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }
    };

    return { theme, toggleTheme };
}