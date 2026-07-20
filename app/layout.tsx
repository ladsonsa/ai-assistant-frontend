import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Assistant Frontend",
    description: "Frontend for AI Assistant Platform",
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({
    children,
}: RootLayoutProps): React.ReactElement {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}