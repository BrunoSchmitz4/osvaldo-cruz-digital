import { useState } from "react";
import { useNavigate } from "react-router";

import { useJogo } from "../../contexto/Jogo";
import { tocarAcerto, tocarErro } from "../../sons";
import Plumbob from "../../components/Plumbob";
import Botao from "../../components/Botao";
import denize from "../../images/personagens/denize.png";
import bruno from "../../images/personagens/bruno.png";
import styles from "./Fim.module.css";

const cores = ["verde", "amarelo", "laranja", "vermelho"];

export default function Fim() {
  const { palavras, ganhas, terminou, recomecar } = useJogo();
  const navegar = useNavigate();

  const [banco, setBanco] = useState(() => Object.values(ganhas).flat());
  const [frase, setFrase] = useState([]);
  const [arrastando, setArrastando] = useState(null);
  const [erros, setErros] = useState(0);
  const [venceu, setVenceu] = useState(false);

  if (!terminou) {
    return (
      <main className={styles.tela}>
        <Plumbob cor="amarelo" tamanho={80} />
        <h1 className={styles.titulo}>Ainda faltam charadas!</h1>
        <p className={styles.texto}>
          Resolva a charada de todas as salas para liberar o desafio final.
        </p>
        <Botao para="/escola">Voltar para a escola</Botao>
      </main>
    );
  }

  function mover(indice, destino, antesDe) {
    const novoBanco = banco.filter((item) => item !== indice);
    const novaFrase = frase.filter((item) => item !== indice);
    const lista = destino === "frase" ? novaFrase : novoBanco;

    const posicao = lista.includes(antesDe) ? lista.indexOf(antesDe) : lista.length;
    lista.splice(posicao, 0, indice);

    setBanco(novoBanco);
    setFrase(novaFrase);
  }

  function soltar(evento, destino, antesDe) {
    evento.preventDefault();
    evento.stopPropagation();
    if (arrastando !== null && arrastando !== antesDe) {
      mover(arrastando, destino, antesDe);
    }
    setArrastando(null);
  }

  function verificar() {
    const certa = frase.every(
      (indice, posicao) => palavras[indice] === palavras[posicao]
    );

    if (certa) {
      tocarAcerto();
      setVenceu(true);
    } else {
      tocarErro();
      setErros(erros + 1);
    }
  }

  function jogarDeNovo() {
    recomecar();
    navegar("/escola");
  }

  function blocos(lista, area) {
    return lista.map((indice) => (
      <button
        key={indice}
        className={styles.bloco}
        draggable
        onDragStart={() => setArrastando(indice)}
        onDragOver={(evento) => evento.preventDefault()}
        onDrop={(evento) => soltar(evento, area, indice)}
        onClick={() => mover(indice, area === "banco" ? "frase" : "banco")}
      >
        {palavras[indice]}
      </button>
    ));
  }

  if (venceu) {
    return (
      <main className={`${styles.tela} ${styles.vitoria}`}>
        <Plumbob tamanho={110} />
        <h1 className={styles.titulo}>Parabéns!</h1>
        <p className={styles.fraseFinal}>{palavras.join(" ")}</p>
        <div className={styles.acoes}>
          <Botao para="/escola">Voltar para a escola</Botao>
          <button className={styles.botao} onClick={jogarDeNovo}>
            Jogar de novo
          </button>
        </div>
        <div className={styles.dupla}>
          <img className={styles.personagem} src={denize} alt="Denize" />
          <img className={styles.personagem} src={bruno} alt="Bruno" />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.tela}>
      <Plumbob key={erros} cor={cores[Math.min(erros, 3)]} tamanho={80} />
      <h1 className={styles.titulo}>Desafio final</h1>
      <p className={styles.texto}>
        Monte a frase com as palavras que você ganhou. Toque nos blocos (ou arraste) para montar.
      </p>

      <div
        className={`${styles.campo} ${styles.campoFrase}`}
        onDragOver={(evento) => evento.preventDefault()}
        onDrop={(evento) => soltar(evento, "frase")}
      >
        {frase.length === 0 && <span className={styles.vazio}>Coloque os blocos aqui</span>}
        {blocos(frase, "frase")}
      </div>

      <div
        className={styles.campo}
        onDragOver={(evento) => evento.preventDefault()}
        onDrop={(evento) => soltar(evento, "banco")}
      >
        {blocos(banco, "banco")}
      </div>

      <button
        className={styles.botao}
        onClick={verificar}
        disabled={banco.length > 0}
      >
        Verificar
      </button>

      {erros > 0 && (
        <p key={"erro" + erros} className={styles.erro}>
          Ainda não está na ordem certa. Tente de novo!
        </p>
      )}
    </main>
  );
}
