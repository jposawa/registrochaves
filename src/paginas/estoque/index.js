import React from 'react';
import { useControle } from '../../hooks/controle';

import styles from "./styles.module.css";

export default function Estoque(){
  const {dados, listaInfo} = useControle();

  console.log(dados);
  return(
    <div>
      <h1>Estoque</h1>

    </div>
  )
}