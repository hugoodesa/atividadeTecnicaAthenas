import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { pessoaEditadaState, pessoasState } from "../../atom/pessoas";
import { StyledButton } from "../styledComponents";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Styled components
const StyledDivInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 2px;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  color: wheat;
  width: 99%;
  box-sizing: border-box;
  margin: 10px;
  align-items:center;
`
//Components
const InputText = ({ field, type, value, setter }) => {
  return (
    <>
      <StyledDivInput>
        <Form.Label>{field}</Form.Label>
        <Form.Control
          //required
          value={value}
          type={type}
          id={field}
          aria-describedby={field}
          placeholder={`informe ${field}`}
          onChange={e=>setter(e.target.value)}
        />
      </StyledDivInput>
    </>
  );
};

const DropDownGender = ({value,setter}) => {
  return (
    <StyledDivInput>
      <label htmlFor="genero">Genero :</label>
      <select
        required
        value={value}
        id="genero"
        className="form-select"
        aria-label="Default select example"
        onChange={e=>setter(e.target.value)}
      >
        <option defaultValue>Selecione o sexo da pessoa</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>
    </StyledDivInput>
  );
};

//JSX
export const FormCadastroPessoa = () => {

  const [nome, setNome] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [genero, setGenero] = useState("")
  const [cpf, setCpf] = useState(0)
  const [altura, setAltura] = useState("")
  const [peso, setPeso] = useState("")
  const [pessoas,setPessoas] = useRecoilState(pessoasState)
  const [pessoaEditar, setPessoaEditar] = useRecoilState(pessoaEditadaState);
  
  const limparCampos =() => {
    setNome("")
    setDataNascimento("")
    setGenero("")
    setCpf(0)
    setAltura("")
    setPeso("")

    //limparPessoa filtrada
    setPessoaEditar({
      id:0,
      nome: "",
      dataNascimento: "",
      cpf: "",
      sexo: "",
      altura: "",
      peso: ""
    })
  }

  const cadastrarPessoa = (pessoa) => {
    let newState=[]
    const {id} = pessoaEditar

    //está editando
    if(id > 0){
      const idx = pessoas.indexOf(pessoaEditar)
      console.log(id)
      console.log(pessoaEditar)

      newState = [...pessoas]
      newState[idx]={id:pessoaEditar.id,...pessoa}
    }else{
      newState = [...pessoas,pessoa]
    }

    console.log(newState)

    setPessoas(newState)
    limparCampos()

    toast('Cadastrado com sucesso');
  }

  const preencherCamposDadosPessoaEditar = () => {
    setNome(pessoaEditar.nome)
    setGenero(pessoaEditar.sexo)
    setCpf(Number(pessoaEditar.cpf))
    setAltura(pessoaEditar.altura)
    setPeso(pessoaEditar.peso)
    setDataNascimento("")
  }

  useEffect(() => {
    
    if(pessoaEditar.nome.length!==""){
      //console.log(pessoaEditar)
      preencherCamposDadosPessoaEditar()
    }

  }, [pessoaEditar])
  

  return (
  
    <Form onSubmit={e=>e.preventDefault()}>

      <h4 style={{color:"wheat"}}>Cadastrar Pessoa</h4>
      <StyledForm>

        <InputText field="nome" type="text" value={nome} setter={setNome}/>
        <InputText field="dataNascimento" type="date" value={dataNascimento} setter={setDataNascimento}/>
        <InputText field="cpf" type="number" value={cpf} setter={setCpf}/>

        <DropDownGender value={genero} setter={setGenero}/>

        <InputText field="Altura" type="number" value={altura} setter={setAltura}/>
        <InputText field="Peso" type="number" value={peso} setter={setPeso}/>

        <StyledButton className="btn btn-primary" onClick={()=>cadastrarPessoa({nome,dataNascimento,genero,cpf,altura,peso})}>
            Cadastrar
        </StyledButton>
        
        <ToastContainer/>

      </StyledForm>

    </Form>
    
  );
};
