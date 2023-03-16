import { useState } from "react";
import CreateProductForm from "./Components/CreateProductForm/CreateProductForm";
import SearchBar from "./Components/SearchBar/SearchBar";
//Si tienen problemas con el import en minuscula o mayuscula 
//es por el cache de vscode, tienen que cerrar y volver a abrirlo

function App() {
  return (
    <div className='App'>
      <SearchBar />
      <CreateProductForm />
    </div>
  );
}
export default App;
