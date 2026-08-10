"use client"; 
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/About.module.css";

/**
 * Secret easter egg page component rendering a personal dedication and special thanks
 * to community members and collaborators.
 *
 * @returns The rendered secret details page view.
 */
export default function DetailsPage() {
    const [view, setView] = useState<"easter-egg" | "outro">("easter-egg");

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <button 
                        type="button"
                        onClick={() => setView(view === "easter-egg" ? "outro" : "easter-egg")}
                        className={styles.lockButton}
                    >
                        {view === "easter-egg" ? "🔓" : "🔒"}
                    </button>{' '}
                    {view === "easter-egg" ? "Easter Egg Unlocked" : "Ultra Secreto"}
                </h1>

                {/* Renderização condicional baseada no estado */}
                {view === "easter-egg" ? (
                    <section className={styles.section}>
                        <p>
                            Queria aproveitar este cantinho secreto para fazer um agradecimento especial ao Sossô.
                            Mesmo nos conhecendo há pouco tempo, a sua paciência e a sua ajuda 
                            no mundo da programação têm sido absurdas e fundamentais para a minha evolução. 
                            Valeu por colar junto e puxar esse bonde!
                        </p>

                        <p>
                            Um abraço gigante para toda essa tropa do Discord: Erik, Big Mouth, Zenki, Jhonson, 
                            e um salve para o Alisson, que de vez em quando marca presença com a gente.
                        </p>

                        <p>
                            Muitos de vocês eu só conheço por tela, mas a verdade é que as nossas Nightly (a nossa versão da daily) 
                            viraram o ponto alto dos meus dias. Valeu por cada risada, troca de ideia e perrengue para resolver código!
                        </p>

                        <p>
                            <strong>
                                PS.: Claro que eu não ia esquecer de você, nosso
                                querido Pote da Ganância (Thaleson). 🃏
                            </strong>
                        </p>
                    </section>
                ) : (
                    <section className={styles.section}>
                        <h2>Nossos segredos mais bonitos</h2>
                        <div className={styles.secretCard}>
                            <p style={{ fontSize: '24px', marginBottom: '20px' }}>✨ 🤍 ✨</p>

                            <h3 className={styles.secretSubtitle}>
                                Para a minha Ariane Sá🌙
                            </h3>

                            <hr className={styles.secretDivider} />

                            <p className={styles.secretText}>
                                Eu queria deixar registrado aqui, neste cantinho que é só nosso, o tamanho da certeza que você é para mim, Ariane. 🌸
                            </p>

                            <p className={styles.secretText}>
                                Não preciso de grandes discursos ou de palavras difíceis para te mostrar o que sinto. O que vive em nós é simples, calmo e profundo. É a certeza de que, entre tantos caminhos possíveis, o melhor lugar do mundo para mim é exatamente ao seu lado. 🗺️💫
                            </p>

                            <p className={styles.secretText}>
                                Renovo aqui o meu compromisso de cuidar de você, de rir dos seus dias bons e de segurar sua mão com firmeza quando o mundo lá fora parecer pesado demais. 🤝❤️ Eu escolho você todos os dias, com a mesma paz e a mesma vontade de fazer dar certo.
                            </p>

                            <p className={styles.secretHighlight}>
                                Obrigado por ser meu refúgio favorito. Eu te amo, hoje e sempre. 🌻✨
                            </p>

                            <p style={{ fontSize: '20px', marginTop: '20px' }}>🔒💌</p>
                        </div>
                    </section>
                )}

                <nav className={styles.navigation}>
                    <Link
                        href="/"
                        className={styles.backButton}
                    >
                        Voltar para o Início
                    </Link>
                </nav>
            </div>
        </main>
    );
}