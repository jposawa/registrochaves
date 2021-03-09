import React, { useState } from 'react';

import styles from "./styles.module.css";

export default function SecaoRetratil(props) {
  const { titulo, children } = props;
  const [secaoAberta, setSecaoAberta] = useState(false);

  return (
    <div className={secaoAberta ? styles.slotSecao : `${styles.slotSecao} ${styles.secaoFechada}`}>
      <h3 onClick={() => { setSecaoAberta(!secaoAberta) }}>
        {titulo}
        <span>
          &#9660;
        </span>
      </h3>
      <div className={styles.secaoRetratil}>

        <div>
          {children}
        </div>
      </div>
    </div>
  )
}