import { useParams, Link } from "react-router";

import { salas } from "../../dados/salas";
import Charada from "../../components/Charada";
import styles from "./Sala.module.css";

function Painel({ titulo, itens }) {
  if (!itens || itens.length === 0) return null;

  return (
    <div className={styles.painel}>
      <h2 className={styles.tituloPainel}>{titulo}</h2>
      <ul className={styles.lista}>
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Sala() {
  const { id } = useParams();
  const sala = salas.find((sala) => sala.id === id);

  if (!sala) {
    return (
      <main className={styles.aviso}>
        <h1>Essa sala não existe</h1>
        <Link to="/escola">Voltar para a escola</Link>
      </main>
    );
  }

  return (
    <main
      className={styles.tela}
      style={sala.imagem ? { backgroundImage: `url(${sala.imagem})` } : undefined}
    >
      <div className={styles.canto}>
        <Link to="/escola" className={styles.voltar}>
          ← Voltar para a escola
        </Link>
        <h1 className={styles.nome}>{sala.nome}</h1>
        {sala.descricao && <p className={styles.descricao}>{sala.descricao}</p>}
      </div>

      <div className={styles.canto}>
        <Painel titulo="Quem trabalha aqui" itens={sala.quemTrabalha} />
        <Painel titulo="Quem frequenta" itens={sala.quemFrequenta} />
      </div>

      <div className={styles.canto}>
        <Painel titulo="O que acontece" itens={sala.oQueAcontece} />
        <Painel titulo="Feito por" itens={sala.grupo} />
      </div>

      <div className={styles.canto}>
        <Charada charada={sala.charada} />
      </div>
    </main>
  );
}
