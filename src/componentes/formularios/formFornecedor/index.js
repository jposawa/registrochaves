import React, { useRef, useState } from 'react';
import { useControle } from '../../../hooks/controle';

import styles from "./styles.module.css";

export default function FormFornecedor(){
  const {dados, salvaDados} = useControle();
  const [mostraForm, setMostraForm] = useState();
  const campoNome = useRef();
  const campoCnpj = useRef();
  const campoMediaDias = useRef();
  const campoFrete = useRef();

  const validaDados = (evento) =>{
    evento.preventDefault(); //Evita a tela de dar refresh

    const novoDado = {
      tipo: "fornecedor",
      dados: {
        nome: campoNome.current.value,
        cnpj: campoCnpj.current.value,
        valorFrete: campoFrete.current.value,
        mediaDias: campoMediaDias.current.value,
      }
    };

    salvaDados(novoDado.tipo, {...novoDado.dados}, "cnpj");
  }

  return(
    <>
    <ul className={styles.listaItens}>
      <button className={mostraForm ? `${styles.btnAdd} ${styles.btnAddAberto}` : styles.btnAdd} type="button" name={mostraForm && "fecha"} onClick={()=>{setMostraForm(!mostraForm)}}>+</button>

      {dados && dados.fornecedor && Object.values(dados.fornecedor).map(dado => (
        <li key={dado.nome}>
          <h4>{dado.nome}</h4>
          <p>{dado.cnpj}</p>
        </li>
      ))}
    </ul>

    <form className={!mostraForm ? `${styles.formFechado} ${styles.formAberto}` : styles.formAberto} name={mostraForm && "fecha"} onSubmit={validaDados}>
      <p>
        <span>Nome:* </span>
        <br/>
        <input name="nome" type="text" placeholder="Nome fornecedor" ref={campoNome} required/>
      </p>

      <p>
        <span>CNPJ:* </span>
        <br/>
        <input name="cnpj" type="tel" placeholder="CNPJ" ref={campoCnpj} required/>
      </p>

      <p>
        <span>Frete:* </span>
        <br/>
        <input name="frete" type="tel" placeholder="Valor Frete" ref={campoFrete} required/>
      </p>

      <p>
        <span>Média dias entrega: </span>
        <br/>
        <input name="dias" type="number" placeholder="Dias" ref={campoMediaDias}/>
      </p>

      <div>
        <button type="submit">Salvar</button>
        <button type="reset">Limpar dados</button>
      </div>
    </form>
    </>
  )
}