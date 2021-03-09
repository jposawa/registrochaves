import React from 'react';
import FormChave from '../../componentes/formularios/formChave';
import FormFornecedor from '../../componentes/formularios/formFornecedor';
import FormMarca from '../../componentes/formularios/formMarca';
import FormTipo from '../../componentes/formularios/formTipo';
import SecaoRetratil from '../../componentes/secaoRetratil';

import styles from "./styles.module.css";

export default function Cadastro(){
  return(
    <div>
      <h1>Cadastro</h1>
      <SecaoRetratil titulo="Chave">
        <FormChave/>
      </SecaoRetratil>

      <SecaoRetratil titulo="Tipo">
        <FormTipo/>
      </SecaoRetratil>

      <SecaoRetratil titulo="Marca">
        <FormMarca/>
      </SecaoRetratil>

      <SecaoRetratil titulo="Fornecedor">
        <FormFornecedor/>
      </SecaoRetratil>
    </div>
  )
}