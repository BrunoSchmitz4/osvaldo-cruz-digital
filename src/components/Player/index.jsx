import styles from "./Player.module.css";

export default function Player({ musica, parar }) {
  const codigo = new URL(musica.video).searchParams.get("v");

  return (
    <aside className={styles.player}>
      <div className={styles.topo}>
        <span className={styles.nome}>🎵 {musica.nome}</span>
        <button className={styles.fechar} onClick={parar}>
          ✕
        </button>
      </div>

      <iframe
        className={styles.video}
        src={`https://www.youtube.com/embed/${codigo}?autoplay=1`}
        title={musica.nome}
        allow="autoplay; encrypted-media"
      />
    </aside>
  );
}
