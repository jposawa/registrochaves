import React, {createContext, useState, useContext, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const ControleContext = createContext();

export const ControleProvider = ({children}) => {
  const uuid = {
    v1: require('uuid/v1'),
    v4: require('uuid/v4'),
  }
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
      chave:"/chave/",
      estoque:"/estoque/",
      fornecedor:"/fornecedor/",
      marca:"/marca/",
      tipo:"/tipo/",
    },
    prefixo:"expressChaves@",
  };
  const [autenticacaoFb, setAutentiacaoFb] = useState(undefined);
  const [bdFb, setBdFb] = useState(undefined);
  const [chaves, setChaves] = useState({});
  const [navegacao, setNavegacao] = useState(["inicio"]);
  const [btnVoltar, setBtnVoltar] = useState(false);
  const [dados, setDados] = useState({
    chave:undefined,
    estoque:undefined,
    fornecedor:undefined,
    marca:undefined,
    tipo:undefined,
  });

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

  const salvaChave = (chave) =>{
    if(chave)
    {
      const _idChave = uuid.v4();
      let _atualizacao = {};
      let _endereco = configInterna.enderecos.chave;

      if(chave.id === null || chave.id === undefined)
      {
        chave.id = _idChave;
      }

      _endereco += chave.ref;

      if(chave.exclui)
      {
        _atualizacao[_endereco] = null;
      }
      else
      {
        _atualizacao[_endereco] = {...chave};
      }

      bdFb.ref().update(_atualizacao).then(resposta => {
        console.log(resposta);
      }).catch(erro => {
        console.log("erro:", erro);
      });
    }
  }

  const salvaDados = (tipoDado, dado, chaveId) =>{
    if(dado)
    {
      const _dados = {...dados};
      const _atualizacao = {};
      let _endereco = configInterna.enderecos[tipoDado];

      if(!chaveId)
      {
        chaveId = "nome";
      }

      _endereco += dado[chaveId];

      if(dado.exclui)
      {
        _atualizacao[_endereco] = null;
      }
      else
      {
        _atualizacao[_endereco] = {...dado};
      }

      bdFb.ref().update(_atualizacao).then((retorno) => {
        console.log(retorno);
        _dados[tipoDado][dado[chaveId]] = {...dado};
        setDados({..._dados});
      }).catch(erro => {
        console.log("erro:", erro);
      });
    }
  }

  const listaInfo = (nomeTabela) =>{
    const referenciaBd = bdFb.ref(configInterna.enderecos[nomeTabela]);
    const _dados = {...dados};

    referenciaBd.on('value', recorte =>{
      const _resultado = recorte.val();
      // const _dados = {...dados};
      _dados[nomeTabela] = _resultado;
      setDados({..._dados});
    });
  }

  const listaChaves = () =>{
    listaInfo("chave");
    // const refChaves = bdFb.ref(configInterna.enderecos.chave);

    // refChaves.on('value', recorte => {
    //   const _resultado = recorte.val();

    //   setChaves({..._resultado});
    // });
  }

  const alteraPagina = (nomePagina) =>{
    const _navegacao = [...navegacao];
    const _paginasDisponiveis = ["inicio","cadastro","vendas", "estoque"];

    if(!_paginasDisponiveis.includes(nomePagina))
    {
      console.warn("Essa página não existe no nosso contexto");
      return;
    }

    if(_navegacao[_navegacao.length-1] === nomePagina)
    {
      console.log("Já estou nessa página...");
      return;
    }

    if(nomePagina)
    {
      _navegacao.push(nomePagina);

      setNavegacao([..._navegacao]);
    }
  }

  const voltaNavegacao = () =>{
    const _navegacao = [...navegacao];

    if(_navegacao.length > 1)
    {
      _navegacao.pop();
    }
    else if(_navegacao.length === 1 && _navegacao[0] !== "inicio")
    {
      _navegacao[0] = "inicio";
    }

    setNavegacao([..._navegacao]);
  }

  const previneRetorno = () =>{
    const _navegacao = [...navegacao];

    if(btnVoltar)
    {
      setBtnVoltar(false);
    }
    else
    {
      if(_navegacao.length > 1)
      {
        setBtnVoltar(true);
        window.history.forward();
        voltaNavegacao();
      }
      else
      {
        window.history.back();
      }
    }
  }

  useEffect(() => {
    window.history.pushState(null,null,window.location.pathname);
    window.addEventListener("popstate", previneRetorno);

    inicializaFirebase();
  },[]);

  useEffect(()=>{
    if(bdFb)
    {
      if(!dados.chave)
      {
        listaInfo("chave");
      }
      else if(!dados.estoque)
      {
        listaInfo("estoque");
      }
      else if(!dados.fornecedor)
      {
        listaInfo("fornecedor");
      }
      else if(!dados.marca)
      {
        listaInfo("marca");
      }
      else if(!dados.tipo)
      {
        listaInfo("tipo");
      }
    }
  },[bdFb, dados])

  const valores = {
    configInterna,
    autenticacaoFb,
    bdFb,
    chaves,
    navegacao,
    dados,
    setAutentiacaoFb,
    setBdFb,
    setChaves,
    setNavegacao,
    setDados,
    inicializaFirebase,
    salvaChave,
    listaChaves,
    alteraPagina,
    voltaNavegacao,
    listaInfo,
    salvaDados,
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