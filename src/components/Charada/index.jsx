import { useState } from "react";

import styles from "./Charada.module.css";

export default function Charada({ charada }) {
  const [resposta, setResposta] = useState("");
  const [acertou, setAcertou] = useState(false);
  const [errou, setErrou] = useState(false);

  if (!charada || !charada.pergunta) return null;

  function verificar(evento) {
    evento.preventDefault();

    const digitado = resposta.trim().toLowerCase();
    const certa = charada.resposta.trim().toLowerCase();

    setAcertou(digitado === certa);
    setErrou(digitado !== certa);
  }

  if (acertou) {
    return (
      <div className={styles.caixa}>
        <h2 className={styles.titulo}>Charada resolvida</h2>
        <p className={styles.palavra}>{charada.recompensa}</p>
      </div>
    );
  }

  return (
    <form className={styles.caixa} onSubmit={verificar}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Charada</h2>
        <span className={styles.lupa}>
          🔍
          <span className={styles.dica}>{charada.dica}</span>
        </span>
      </div>

      <p className={styles.texto}>{charada.pergunta}</p>

      <input
        className={styles.campo}
        value={resposta}
        onChange={(evento) => setResposta(evento.target.value)}
        placeholder="Digite sua resposta"
      />

      <button className={styles.botao}>Responder</button>

      {errou && <p className={styles.texto}>Ainda não é essa. Veja a dica na lupa.</p>}
    </form>
  );
}
