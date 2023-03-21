import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import { Routes, Route } from "react-router";
import CreateProductForm from "./Components/CreateProductForm/CreateProductForm";
import UpdateProductForm from './Components/UpdateProductForm/UpdateProductForm';
import Detail from "./Components/Detail/Detail";
import AboutUs from './Components/AboutUs/AboutUs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from './Redux/actions';
import { AppDispatch } from './Redux/store';
import NotFound from './Components/NotFound/NotFound';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart'

//Si tienen problemas con el import en minuscula o mayuscula 
//es por el cache de vscode, tienen que cerrar y volver a abrirlo

function App() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  })
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path ="/shoppingcart" element ={<ShoppingCart/>}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/productform" element={<CreateProductForm />} />
      <Route path="/updateform/:id" element={<UpdateProductForm />} />
      <Route path="/products/:id" element={<Detail />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

