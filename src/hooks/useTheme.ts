"use client";

import { useState, useEffect } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"dark" | "light">(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("app-theme");
            if (saved === "light" || saved === "dark") return saved;
            
            const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
            return mediaQuery.matches ? "light" : "dark";
        }
        return "dark";
    });

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
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return { theme, toggleTheme };
}