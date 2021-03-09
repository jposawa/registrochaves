import React from 'react';

import {DatabaseOutlined, DollarOutlined, FileAddOutlined, HomeOutlined} from '@ant-design/icons';

import styles from './styles.module.css';
import { useControle } from '../../hooks/controle';

export default function Menu(){
  const {alteraPagina, navegacao} = useControle();

  return(
    <nav className={styles.menu}>
      <li className={navegacao[navegacao.length-1] === "inicio" ? `${styles.itemMenu} ${styles.itemAtual}` : styles.itemMenu} onClick={() => {alteraPagina("inicio")}}>
        <span><HomeOutlined /></span>
        <span>Início</span>
      </li>

      <li className={navegacao[navegacao.length-1] === "vendas" ? `${styles.itemMenu} ${styles.itemAtual}` : styles.itemMenu} onClick={() => {alteraPagina("vendas")}}>
        <span><DollarOutlined /></span>
        <span>Vendas</span>
      </li>

      <li className={navegacao[navegacao.length-1] === "cadastro" ? `${styles.itemMenu} ${styles.itemAtual}` : styles.itemMenu} onClick={() => {alteraPagina("cadastro")}}>
        <span><FileAddOutlined /></span>
        <span>Cadastro</span>
      </li>

      <li className={navegacao[navegacao.length-1] === "estoque" ? `${styles.itemMenu} ${styles.itemAtual}` : styles.itemMenu} onClick={() => {alteraPagina("estoque")}}>
        <span><DatabaseOutlined /></span>
        <span>Estoque</span>
      </li>
    </nav>
  );
}