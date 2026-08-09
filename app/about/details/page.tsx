import Link from "next/link";
import styles from "@/styles/About.module.css";

export default function DetailsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    🔓 Easter Egg Unlocked
                </h1>

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