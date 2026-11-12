import Botao from "../../components/Botao";
import fundo from "./Fundo.svg";
import logo from "./Logo.svg";
import styles from "./Inicio.module.css";

export default function Inicio() {
  return (
    <main className={styles.tela} style={{ backgroundImage: `url(${fundo})` }}>
      <img className={styles.logo} src={logo} alt="The Osvaldo Cruz" />
      <Botao para="/escola">Começar</Botao>
    </main>
  );
}
