import Plumbob from "../Plumbob";
import styles from "./ComoJogar.module.css";

export default function ComoJogar() {
  return (
    <aside className={styles.balao}>
      <h2 className={styles.titulo}>
        <Plumbob tamanho={30} />
        Como jogar
      </h2>

      <ol className={styles.passos}>
        <li>Leia a charada da sala.</li>
        <li>A resposta é o nome de outra sala. Digite e envie.</li>
        <li>Acertou? Você pode ganhar palavras da frase secreta.</li>
        <li>Resolva todas as salas e monte a frase final.</li>
      </ol>
    </aside>
  );
}
