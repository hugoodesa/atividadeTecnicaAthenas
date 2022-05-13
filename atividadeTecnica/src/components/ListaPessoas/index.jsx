import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../styledComponents";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  pessoaEditadaState,
  pessoaFiltradasState,
  pessoasState
} from "../../atom/pessoas";
import { Button, Form, FormControl } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactComponent as PencilLogo } from "../../icons/pencil.svg";
import { ReactComponent as TrashLogo } from "../../icons/trash.svg";
import { ReactComponent as SearchLogo } from "../../icons/search.svg";

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledLI = styled.li`
  margin: 5px;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  align-items: flex-end;
  justify-content: space-between;
  :hover {
    background-color: aliceblue;
    cursor: pointer;
  }
`;
const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

const CardName = styled.p`
  height: "100%";
`;

const calcularPesoIdeal=({sexo,altura})=>{
  if(sexo==="M"){
    return (72.7*Number(altura))-58
  }

  return (62.1*Number(altura))-44.7
}

const alertPesoIdeal= (pessoa) => {
  return `${pessoa.nome} \n altura : ${pessoa.altura} \n peso :${pessoa.peso} \n peso ideal : ${calcularPesoIdeal(pessoa).toFixed(2)}`
}

const removerElementoLista = (list, setter, pessoa) => {
  const newStateList = [...list];

  const idx = newStateList.indexOf(pessoa)

  console.log(idx)

  newStateList.splice(idx, 1);

  setter([...newStateList]);
  toast("Removido com sucesso");
};

const SearchComponent = () => {
  const [pesquisa, setPesquisa] = useState("");
  const [pessoasFiltradas, setPessoasFiltradas] = useRecoilState(pessoaFiltradasState);
  const pessoas = useRecoilValue(pessoasState);

  const filtrarPessoa = (value) => {
    const newStatePessoasFiltradas = pessoas.filter(pessoa => {
      const pesquisaLowerCase = pessoa.nome.toLowerCase();
      return pesquisaLowerCase.includes(value.toLowerCase());
    });

    setPessoasFiltradas(newStatePessoasFiltradas);
  };

  useEffect(() => {
    if(pessoasFiltradas.length===0){
      setPesquisa("")
    }
  }, [pessoasFiltradas])
  

  return (
    <Form className="d-flex">
      <FormControl
        value={pesquisa}
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={e => {
          setPesquisa(e.target.value);
          filtrarPessoa(e.target.value);
        }}
      />
      <Button variant="outline-success" onClick={()=>filtrarPessoa(pesquisa)}>
        Search
      </Button>
    </Form>
  );
};

const ElementLI = ({ children, index, pessoa }) => {
  const [pessoas, setPessoas] = useRecoilState(pessoasState);
  const [pessoaEditar, setPessoaEditar] = useRecoilState(pessoaEditadaState);
  const [pessoasFiltradas,setPessoasFiltradas] = useRecoilState(pessoaFiltradasState);

  const handleEditarPessoa = () => {
    console.log(pessoa)
    setPessoaEditar({...pessoa});
  };

  const limparFiltro=()=>{
    setPessoasFiltradas([])
  }

  return (
    <StyledLI className="list-group-item">
      <CardName>{pessoa.nome}</CardName>

      <ActionButtons>
        <StyledButton
          actionButton
          className="btn btn-secondary"
          onClick={handleEditarPessoa}
        >
          Editar
          <PencilLogo style={{ marginLeft: "5px" }} />
        </StyledButton>

        <StyledButton
          actionButton
          className="btn btn-danger"
          onClick={() => {
            removerElementoLista(pessoas, setPessoas, pessoa)
            limparFiltro()
          }}
        >
          Del
          <TrashLogo style={{ marginLeft: "5px" }} />
        </StyledButton>

        <StyledButton
          actionButton
          className="btn btn-outline-primary"
          onClick={() => alert(alertPesoIdeal(pessoa))}
        >
          Info
          <SearchLogo style={{ marginLeft: "5px" }} />
        </StyledButton>
      </ActionButtons>

    </StyledLI>
  );
};

export const ListaPessoas = () => {
  const pessoas = useRecoilValue(pessoasState);
  const pessoaFiltradas = useRecoilValue(pessoaFiltradasState);

  const ListaFiltradaComponent = () => {
    return pessoaFiltradas.map((pessoa, key) => (
      <ElementLI
        key={key}
        index={key}
        pessoa={pessoa}
        className="list-group-item"
      />
    ));
  };

  const ListaCompletaComponent = () => {
    return pessoas.map((pessoa, key) => (
      <ElementLI
        key={key}
        index={key}
        pessoa={pessoa}
        className="list-group-item"
      />
    ));
  };


  return (
    <StyledList>
      <h4 style={{ color: "wheat" }}>Listagem de pessoas</h4>

      <SearchComponent />

      {
        (pessoaFiltradas.length === 0 ) ? ListaCompletaComponent() : ListaFiltradaComponent() 
      }
    
      <ToastContainer />
    </StyledList>
  );
};
