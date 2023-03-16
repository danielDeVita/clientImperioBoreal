import { useState } from "react";
import CreateProductForm from "./Components/CreateProductForm/CreateProductForm";
import SearchBar from "./Components/SearchBar/SearchBar";

function App() {
  return (
    <div className='App'>
      <SearchBar />
      <CreateProductForm />
    </div>
  );
}
export default App;
