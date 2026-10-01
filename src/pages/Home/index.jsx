import { Link } from "react-router";

import { salas } from "../../dados/salas";
import { musicas } from "../../dados/musicas";
import Plumbob from "../../components/Plumbob";
import styles from "./Home.module.css";

export default function Home({ musica, tocar }) {
  return (
    <main className={styles.mapa}>
      <h1 className={styles.titulo}>Escolha uma sala</h1>

      <div className={styles.radio}>
        {musicas.map((item) => (
          <button
            key={item.video}
            className={item === musica ? `${styles.musica} ${styles.tocando}` : styles.musica}
            onClick={() => tocar(item)}
          >
            {item === musica ? "🔊" : "▶"} {item.nome}
          </button>
        ))}
      </div>

      <div className={styles.lista}>
        {salas.map((sala) => (
          <Link key={sala.id} to={`/sala/${sala.id}`} className={styles.sala}>
            <Plumbob />
            {sala.nome}
          </Link>
        ))}
      </div>
    </main>
  );
}
