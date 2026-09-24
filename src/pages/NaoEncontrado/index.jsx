import Botao from "../../components/Botao";
import styles from "./NaoEncontrado.module.css";

export default function NaoEncontrado() {
  return (
    <main className={styles.tela}>
      <h1 className={styles.titulo}>Essa página não existe</h1>
      <Botao para="/">Voltar para o início</Botao>
    </main>
  );
}
