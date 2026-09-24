import { Link } from "react-router";

import styles from "./Botao.module.css";

export default function Botao({ para, children }) {
  return (
    <Link to={para} className={styles.botao}>
      {children}
    </Link>
  );
}
