import { Link } from "react-router";

import { salas } from "../../dados/salas";
import Plumbob from "../../components/Plumbob";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.mapa}>
      <h1 className={styles.titulo}>Escolha uma sala</h1>

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
