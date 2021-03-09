import React, { useRef, useState } from 'react';
import { useControle } from '../../../hooks/controle';

import styles from "./styles.module.css";

export default function FormChave(){
  const {dados, salvaDados} = useControle();
  const [mostraForm, setMostraForm] = useState();
  const campoRef = useRef();
  const campoFornecedor = useRef();
  const campoMarca = useRef();
  const campoPreco = useRef();
  const campoCusto = useRef();
  const campoTipo = useRef();
  const campoDesc = useRef();

  const validaDados = (evento) =>{
    evento.preventDefault(); //Evita a tela de dar refresh

    const novoDado = {
      tipo: "chave",
      dados: {
        custo: campoCusto.current.value,
        descricao: campoDesc.current.value,
        fornecedor: campoFornecedor.current.value,
        marca: campoMarca.current.value,
        precoVenda: campoPreco.current.value,
        ref: campoRef.current.value,
        tipo: campoTipo.current.value,
      }
    };

    salvaDados(novoDado.tipo, {...novoDado.dados}, "ref");
  }

  return(
    <>
    <ul className={styles.listaItens}>
      <button className={mostraForm ? `${styles.btnAdd} ${styles.btnAddAberto}` : styles.btnAdd} type="button" name={mostraForm && "fecha"} onClick={()=>{setMostraForm(!mostraForm)}}>+</button>

      {dados && dados.chave && Object.values(dados.chave).map(dado => (
        <li key={dado.nome}>
          <h4>{dado.ref}</h4>
          <p>{dado.marca}</p>
        </li>
      ))}
    </ul>

    <form className={!mostraForm ? `${styles.formFechado} ${styles.formAberto}` : styles.formAberto} name={mostraForm && "fecha"} onSubmit={validaDados}>
      <p>
        <span>Referência:* </span>
        <br/>
        <input name="referencia" type="text" placeholder="Referência" ref={campoRef} required/>
      </p>

      <p>
        <span>Tipo:* </span>
        <br/>
        <select ref={campoTipo} required>
          <option value="">Selecione</option>
          {
            dados && dados.tipo && Object.values(dados.tipo).map(tipo => (
              <option key={tipo.nome}>{tipo.nome}</option>
            ))
          }
        </select>
      </p>

      <p>
        <span>Marca:* </span>
        <br/>
        <select ref={campoMarca} required>
          <option value="">Selecione</option>
          {
            dados && dados.marca && Object.values(dados.marca).map(marca => (
              <option key={marca.nome}>{marca.nome}</option>
            ))
          }
        </select>
      </p>

      <p>
        <span>Fornecedor:* </span>
        <br/>
        <input name="fornecedor" type="text" list="listaFornecedor" placeholder="Fornecedor" ref={campoFornecedor} required/>
        <datalist id="listaFornecedor">
          {
            dados && dados.fornecedor && Object.values(dados.fornecedor).map(fornecedor => (
              <option value={fornecedor.cnpj}>{fornecedor.nome}</option>
            ))
          }
        </datalist>
      </p>

      <p>
        <span>Custo:* </span>
        <br/>
        <input name="custo" type="tel" placeholder="Custo" ref={campoCusto} required/>
      </p>

      <p>
        <span>Preço venda:* </span>
        <br/>
        <input name="preco" type="tel" placeholder="Preço" ref={campoPreco} required/>
      </p>

      <p>
        <span>Descrição: </span>
        <br/>
        <textarea ref={campoDesc} placehodler="Descrição"></textarea>
      </p>

      <div>
        <button type="submit">Salvar</button>
        <button type="reset">Limpar dados</button>
      </div>
    </form>
    </>
  )
}