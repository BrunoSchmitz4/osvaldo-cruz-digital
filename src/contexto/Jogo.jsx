import { createContext, useContext, useEffect, useState } from "react";

import { salas } from "../dados/salas";
import { frase } from "../dados/frase";

const palavras = frase.split(" ").filter((palavra) => palavra !== "");
const salasComCharada = salas.filter((sala) => sala.charada.pergunta);
const chave = "osvaldo-cruz:" + frase;

const JogoContexto = createContext();

export function JogoProvider({ children }) {
  const [ganhas, setGanhas] = useState(
    () => JSON.parse(localStorage.getItem(chave)) || {}
  );

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(ganhas));
  }, [ganhas]);

  function ganharPalavras(idSala) {
    if (ganhas[idSala]) return;

    const usadas = Object.values(ganhas).flat();
    const livres = palavras
      .map((palavra, indice) => indice)
      .filter((indice) => !usadas.includes(indice));

    const salasFaltando = salasComCharada.length - Object.keys(ganhas).length;
    const quantidade = Math.ceil(livres.length / salasFaltando);

    const sorteadas = [];
    for (let vez = 0; vez < quantidade; vez++) {
      const posicao = Math.floor(Math.random() * livres.length);
      sorteadas.push(livres.splice(posicao, 1)[0]);
    }

    setGanhas({ ...ganhas, [idSala]: sorteadas });
  }

  function recomecar() {
    setGanhas({});
  }

  const terminou =
    salasComCharada.length > 0 &&
    salasComCharada.every((sala) => ganhas[sala.id]);

  return (
    <JogoContexto.Provider
      value={{ palavras, ganhas, ganharPalavras, terminou, recomecar }}
    >
      {children}
    </JogoContexto.Provider>
  );
}

export function useJogo() {
  return useContext(JogoContexto);
}
