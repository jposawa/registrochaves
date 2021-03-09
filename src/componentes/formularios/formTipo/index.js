import React, { useRef, useState } from 'react';
import { useControle } from '../../../hooks/controle';

import styles from "./styles.module.css";

export default function FormTipo(){
  const {dados, salvaDados} = useControle();
  const [mostraForm, setMostraForm] = useState();
  const campoNome = useRef();
  const campoDesc = useRef();

  const validaDados = (evento) =>{
    evento.preventDefault(); //Evita a tela de dar refresh

    const novoDado = {
      tipo: "tipo",
      dados: {
        nome: campoNome.current.value,
        descricao: campoDesc.current.value,
      }
    };

    salvaDados(novoDado.tipo, {...novoDado.dados});
  }

  return(
    <>
    <ul className={styles.listaItens}>
      <button className={mostraForm ? `${styles.btnAdd} ${styles.btnAddAberto}` : styles.btnAdd} type="button" name={mostraForm && "fecha"} onClick={()=>{setMostraForm(!mostraForm)}}>+</button>

      {dados && dados.tipo && Object.values(dados.tipo).map(dado => (
        <li key={dado.nome}>
          <h4>{dado.nome}</h4>
          <p>{dado.descricao}</p>
        </li>
      ))}
    </ul>

    <form className={!mostraForm ? `${styles.formFechado} ${styles.formAberto}` : styles.formAberto} name={mostraForm && "fecha"} onSubmit={validaDados}>
      <p>
        <span>Nome: </span>
        <br/>
        <input name="nome" type="text" placeholder="Nome tipo" ref={campoNome} required/>
      </p>

      <p>
        <span>Descrição: </span>
        <br/>
        <textarea name="descricao" placeholder="Descrição tipo" ref={campoDesc}></textarea>
      </p>

      <div>
        <button type="submit">Salvar</button>
        <button type="reset">Limpar dados</button>
      </div>
    </form>
    </>
  )
}