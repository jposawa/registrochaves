import React from 'react';
import Menu from './componentes/menu';

import './estilos.css';
import { useControle } from './hooks/controle';
import Cadastro from './paginas/cadastro';
import Estoque from './paginas/estoque';
import Inicio from './paginas/inicio';
import Vendas from './paginas/vendas';

export default function Principal()
{
  const {navegacao} = useControle();

  // console.log(navegacao);
  
  return(
    <div className="corpoSite temaPrincipal">
      <div className="corpoPagina">
        {{
          "inicio":
          (
            <Inicio/>
          ),
          "vendas":
          (
            <Vendas/>
          ),
          "cadastro":
          (
            <Cadastro/>
          ),
          "estoque":
          (
            <Estoque/>
          )
        }[navegacao[navegacao.length-1]]}
      </div>
      
      <div className="slotMenu">
        <Menu/>
      </div>
    </div>
  );
}