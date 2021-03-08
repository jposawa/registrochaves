import React, {createContext, useState, useContext} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const ControleContext = createContext();

export const ControleProvider = ({children}) => {
  const configInterna = {
    apiFb:{
      apiKey: "AIzaSyAV_lwcm3QSSKPfCri3qHVi50bxG7_3qc8",
      authDomain: "chaves-7cabe.firebaseapp.com",
      projectId: "chaves-7cabe",
      storageBucket: "chaves-7cabe.appspot.com",
      messagingSenderId: "661721104187",
      appId: "1:661721104187:web:dc2601b74e93fe93ad011e",
      measurementId: "G-F2CWK594EF",
    },
    enderecos:{
      usuario:"/usuario/",
      chave:"/chave/",
    },
    prefixo:"expressChaves@",
  };
  const [autenticacaoFb, setAutentiacaoFb] = useState(undefined);
  const [bdFb, setBdFb] = useState(undefined);

  const inicializaFirebase = () =>{
    try
    {
      firebase.initializeApp(configInterna.apiFb);
      const _autenticavaoFb = firebase.auth();
      const _bdFb = firebase.database();

      setAutentiacaoFb(_autenticavaoFb);
      setBdFb(_bdFb);
    }
    catch(erro)
    {
      if(!/already exists/.test(erro.message))
      {
        console.log("Deu ruim no Firebase!", erro.stack);
      }
    }
  }

  const valores = {
    configInterna,
    autenticacaoFb,
    bdFb,
    setAutentiacaoFb,
    setBdFb,
    inicializaFirebase,
  };

  return(
    <ControleContext.Provider value={valores}>
      {children}
    </ControleContext.Provider>
  )
}

export function useControle(){
  const content = useContext(ControleContext);

  if(!content){
    console.log("Tem que estar em um Provider");
  }

  return content;
}