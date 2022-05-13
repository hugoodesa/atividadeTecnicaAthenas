import {  Routes, Route } from "react-router-dom";
import App from "../App";
import { Clientes } from "../Components/Clientes";
import { ListaClientes } from "../Components/Clientes/listarClientes";

export const RoutesComponent = () => {
  return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Clientes />} />
        <Route path="/listar" element={<ListaClientes/>} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
  );
};
