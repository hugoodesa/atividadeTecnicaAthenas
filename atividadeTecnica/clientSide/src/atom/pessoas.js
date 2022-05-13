import {atom} from "recoil"

const pessoas=[
  {id:1,nome:"Ana",dataNascimento:"11/01/2021",cpf:"01234578921",sexo:"F",altura:"1.50",peso:"62"},
  {id:2,nome:"Lia",dataNascimento:"11/01/2021",cpf:"01234578921",sexo:"F",altura:"1.60",peso:"50"},
  {id:3,nome:"Bia",dataNascimento:"11/01/2021",cpf:"01234578921",sexo:"F",altura:"1.63",peso:"80"},
  {id:4,nome:"Luca",dataNascimento:"11/01/2021",cpf:"98765432121",sexo:"M",altura:"1.82",peso:"120"},
  {id:5,nome:"Hugo",dataNascimento:"11/01/2021",cpf:"01234578921",sexo:"M",altura:"1.75",peso:"80"},
  {id:6,nome:"Luiz",dataNascimento:"11/01/2021",cpf:"01234578921",sexo:"M",altura:"1.72",peso:"90"}
]

export const pessoasState = atom({
  key:"pessoasState",
  default:pessoas
})

export const pessoaFiltradasState = atom({
  key:"pessoaFiltradasState",
  default:[]
})

export const pessoaEditadaState = atom({
  key:"pessoaEditadaState",
  //default:""
  default:{id:0,nome:"",dataNascimento:"",cpf:"",sexo:"",altura:"",peso:""}
})

