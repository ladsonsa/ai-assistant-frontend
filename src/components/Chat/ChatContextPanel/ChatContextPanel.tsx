"use client";

import styles from "./ChatContextPanel.module.css";

interface Result {
    readonly id: string;
    readonly value: string;
}

interface ChatContextPanelProps {
    readonly conversationTitle: string | null;
    readonly results: readonly Result[];
}

export function ChatContextPanel({
    conversationTitle,
    results,
}: ChatContextPanelProps) {
    return (
        <aside
            className={styles.rightSidebar}
            aria-label="Contexto da conversa"
        >
            <div
                className={styles.rightSidebarHeader}
            >
                <span
                    className={styles.panelEyebrow}
                >
                    CONTEXTO
                </span>

                <h2
                    className={styles.rightSidebarTitle}
                >
                    {conversationTitle ??
                        "Nenhuma conversa"}
                </h2>
            </div>

            <div
                className={styles.contextSummary}
            >
                <span
                    className={styles.contextLabel}
                >
                    Resultados encontrados
                </span>

                <strong
                    className={styles.contextCount}
                >
                    {results.length}
                </strong>
            </div>

            <section
                className={styles.boxSection}
            >
                <h3>Últimos resultados</h3>

                <div
                    className={styles.resultsList}
                >
                    {results.length === 0 ? (
                        <div
                            className={
                                styles.emptyResult
                            }
                        >
                            <strong>
                                Nenhum resultado
                                ainda.
                            </strong>

                            <span>
                                Os resultados desta
                                conversa aparecerão
                                aqui.
                            </span>
                        </div>
                    ) : (
                        results.map(
                            (result, index) => (
                                <article
                                    key={result.id}
                                    className={
                                        styles.resultBox
                                    }
                                >
                                    <div
                                        className={
                                            styles.resultMeta
                                        }
                                    >
                                        <span>
                                            Resultado #
                                            {results.length -
                                                index}
                                        </span>

                                        <span>
                                            {
                                                conversationTitle
                                            }
                                        </span>
                                    </div>

                                    <strong
                                        className={
                                            styles.resultValue
                                        }
                                    >
                                        {result.value}
                                    </strong>
                                </article>
                            ),
                        )
                    )}
                </div>
            </section>
        </aside>
    );
}