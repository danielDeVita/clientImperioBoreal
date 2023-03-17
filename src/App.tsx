import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import { Routes, Route } from "react-router";
import CreateProductForm from "./Components/CreateProductForm/CreateProductForm";
import UpdateProductForm from './Components/UpdateProductForm/UpdateProductForm';

//Si tienen problemas con el import en minuscula o mayuscula 
//es por el cache de vscode, tienen que cerrar y volver a abrirlo

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/productform" element={<CreateProductForm/>}/>
      <Route path="/updateform" element={<UpdateProductForm/>}/>
    </Routes>
  );
}

export default App;

