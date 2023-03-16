import { useState } from 'react'
import SearchBar from './Components/SearchBar/SearchBar'
import CreateProductForm from './Components/CreateProductForm/CreateProductForm'

function App() {


  return (
    <div className="App">
      <SearchBar/>
      <CreateProductForm/>
    </div>
  )
}
export default App