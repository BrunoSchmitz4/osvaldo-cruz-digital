import { useState } from "react";
import { useNavigate } from "react-router";

import { useJogo } from "../../contexto/Jogo";
import styles from "./Recomecar.module.css";

export default function Recomecar() {
  const { recomecar } = useJogo();
  const navegar = useNavigate();
  const [confirmando, setConfirmando] = useState(false);

  function reiniciar() {
    recomecar();
    navegar("/");
  }

  if (confirmando) {
    return (
      <div className={styles.caixa}>
        <p className={styles.pergunta}>Apagar as palavras ganhas e recomeçar do zero?</p>
        <div className={styles.botoes}>
          <button className={styles.sim} onClick={reiniciar}>
            Sim, recomeçar
          </button>
          <button className={styles.nao} onClick={() => setConfirmando(false)}>
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <button className={styles.reset} onClick={() => setConfirmando(true)}>
      ↺ Recomeçar do zero
    </button>
  );
}
