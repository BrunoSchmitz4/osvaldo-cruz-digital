import styles from "./Plumbob.module.css";

export default function Plumbob({ cor = "verde", tamanho = 30 }) {
  return (
    <span
      className={`${styles.plumbob} ${styles[cor]}`}
      style={{ width: tamanho * 0.6, height: tamanho }}
    >
      <svg className={styles.gema} viewBox="0 0 60 100">
        <polygon className={styles.claro} points="30,0 2,42 30,50" />
        <polygon className={styles.medio} points="30,0 30,50 58,42" />
        <polygon className={styles.escuro} points="2,42 30,50 30,100" />
        <polygon className={styles.sombra} points="30,50 58,42 30,100" />
      </svg>
    </span>
  );
}
