"use client";

import styles from "./ChatResult.module.css";

interface ChatResultProps {
    readonly index: number;
    readonly total: number;
    readonly conversationTitle: string | null;
    readonly value: string;
}

export function ChatResult({
    index,
    total,
    conversationTitle,
    value,
}: ChatResultProps) {
    return (
        <article className={styles.resultBox}>
            <div className={styles.resultMeta}>
                <span>
                    Resultado #{total - index}
                </span>

                <span>
                    {conversationTitle}
                </span>
            </div>

            <strong className={styles.resultValue}>
                {value}
            </strong>
        </article>
    );
}