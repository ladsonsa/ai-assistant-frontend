import styles from "./LoadingIndicator.module.css";

/**
 * Component that renders an animated three-dot loading indicator to signal
 * ongoing background tasks or pending server responses.
 *
 * @returns The rendered loading indicator component.
 */
export function LoadingIndicator() {
    return (
        <div className={styles.container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
}