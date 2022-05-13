import './App.css';
import { Footer } from './components/Footer';
import { FormCadastroPessoa } from './components/FormCadastroPessoa/index.';
import { ListaPessoas } from './components/ListaPessoas';
import {RecoilRoot} from "recoil"

export function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <FormCadastroPessoa/>
        <ListaPessoas/>
        <Footer/>
      </RecoilRoot>
    </div>
  );
}

export default App;
