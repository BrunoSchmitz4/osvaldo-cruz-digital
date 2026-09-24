import Botao from "../../components/Botao";
import fundo from "./ImagemFundo.svg";
import styles from "./Inicio.module.css";

export default function Inicio() {
  return (
    <main className={styles.tela} style={{ backgroundImage: `url(${fundo})` }}>
      {/* <h1 className={styles.titulo}>Osvaldo Cruz Digital</h1>
      <p className={styles.subtitulo}>Um passeio pela escola, sala por sala</p> */}
      <Botao para="/escola">Começar</Botao>
    </main>
  );
}
