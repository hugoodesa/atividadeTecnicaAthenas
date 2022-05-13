import axios from "axios";

//LAYER THAT WILL BE THE INTERACT WITH SERVICE
//VERBS HTTP

export const getMethod = async (route, param) => {
  const uri = `http://localhost:3001/${route}?${param}`;
  const result = await axios.get(uri);
  return result.data;
};

export const postMethod = async (route, data) => {
  const uri = `http://localhost:3001/${route}`;
  const result = await axios.post(uri, data);
  return result.statusText;
};

export const putMethod = async (route, data) => {
  const uri = `http://localhost:3001/${route}`;
  const result = await axios.put(uri, data);
  return result.statusText;
};

/* export const getClientes = async () => {
  const resp = await axios.get("http://localhost:3001/clientes")
  console.log(resp.data)
  return resp.data
}; */
