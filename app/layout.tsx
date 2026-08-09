import "./globals.css";

import type { Metadata } from "next";

/**
 * Global application metadata configuration for Next.js App Router.
 */
export const metadata: Metadata = {
    title: "AI Assistant Frontend",
    description: "Frontend for AI Assistant Platform",
};

/**
 * Props interface for the {@link RootLayout} component.
 */
type RootLayoutProps = Readonly<{
    /**
     * The child components or page views to be rendered inside the root HTML layout.
     */
    children: React.ReactNode;
}>;

/**
 * Root layout wrapper component for the Next.js App Router application.
 * Defines the top-level `<html>` and `<body>` structure and imports global styles.
 *
 * @param props The component properties containing child nodes.
 * @returns The top-level HTML document framework element.
 */
export default function RootLayout({
    children,
}: RootLayoutProps): React.ReactElement {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}