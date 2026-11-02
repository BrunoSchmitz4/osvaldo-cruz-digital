import { useState } from "react";

import { useJogo } from "../../contexto/Jogo";
import { salas } from "../../dados/salas";
import Plumbob from "../Plumbob";
import Botao from "../Botao";
import styles from "./Charada.module.css";

const cores = ["verde", "amarelo", "laranja", "vermelho"];
const salasComCharada = salas.filter((sala) => sala.charada.pergunta);

function limpar(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function Charada({ idSala, charada }) {
  const { palavras, ganhas, ganharPalavras, terminou } = useJogo();
  const [resposta, setResposta] = useState("");
  const [erros, setErros] = useState(0);
  const [verDica, setVerDica] = useState(false);

  if (!charada || !charada.pergunta) return null;

  const ganhou = ganhas[idSala];
  const posicao = salasComCharada.findIndex((sala) => sala.id === idSala);
  const proxima = salasComCharada[posicao + 1];
  const cor = cores[Math.min(erros, cores.length - 1)];

  function verificar(evento) {
    evento.preventDefault();

    if (resposta.trim() === "") return;

    if (limpar(resposta) === limpar(charada.resposta)) {
      ganharPalavras(idSala);
    } else {
      setErros(erros + 1);
      setResposta("");
    }
  }

  if (ganhou) {
    return (
      <section className={styles.caixa}>
        <div className={styles.resolvida}>
          <Plumbob tamanho={56} />
          <div>
            <h2 className={styles.titulo}>Charada resolvida!</h2>
            <p className={styles.texto}>
              {ganhou.length > 0 ? "Você ganhou:" : "Você já tem todas as palavras."}
            </p>
          </div>
        </div>

        <div className={styles.palavras}>
          {ganhou.map((indice) => (
            <span key={indice} className={styles.palavra}>
              {palavras[indice]}
            </span>
          ))}
        </div>

        {proxima && <Botao para={"/sala/" + proxima.id}>Próxima sala →</Botao>}
        {terminou && <Botao para="/fim">Montar a frase final</Botao>}
      </section>
    );
  }

  return (
    <section className={styles.caixa}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Charada</h2>
        {charada.dica && (
          <button
            type="button"
            className={styles.botaoDica}
            onClick={() => setVerDica(!verDica)}
          >
            💡 Dica
          </button>
        )}
      </div>

      <p className={styles.pergunta}>{charada.pergunta}</p>

      {verDica && <p className={styles.dica}>{charada.dica}</p>}

      <form className={styles.linha} onSubmit={verificar}>
        <Plumbob key={erros} cor={cor} tamanho={56} />
        <input
          className={styles.campo}
          value={resposta}
          onChange={(evento) => setResposta(evento.target.value)}
          placeholder="Digite sua resposta"
        />
        <button className={styles.enviar}>Enviar</button>
      </form>

      {erros > 0 && (
        <p key={erros} className={styles.erro}>
          Resposta errada! Tente de novo.
        </p>
      )}
    </section>
  );
}
