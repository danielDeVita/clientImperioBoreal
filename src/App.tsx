import { useState } from "react";
import Dashboard from './Components/Dashboard/Dashboard';

//Si tienen problemas con el import en minuscula o mayuscula 
//es por el cache de vscode, tienen que cerrar y volver a abrirlo

function App() {
  return (
    <div className='App'>
      <Dashboard />
    </div>
  );
}
export default App;
