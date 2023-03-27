import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Routes, Route } from "react-router";
import CreateProductForm from "./Components/CreateProductForm/CreateProductForm";
import UpdateProductForm from "./Components/UpdateProductForm/UpdateProductForm";
import Detail from "./Components/Detail/Detail";
import AboutUs from "./Components/AboutUs/AboutUs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts, getCategories } from "./Redux/actions";
import { AppDispatch } from "./Redux/store";
import NotFound from "./Components/NotFound/NotFound";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import useLocalStorage from "./hooks/useLocalStorage";
import { KEY_LOCAL_STORAGE } from "./types.d";
import Profile from "./Components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loading/Loading";
import axios from "axios";
import Orders from "./Components/Dashboard/Orders/Orders";
import Users from "./Components/Dashboard/Users/Users"
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

//Si tienen problemas con el import en minuscula o mayuscula
//es por el cache de vscode, tienen que cerrar y volver a abrirlo

function App() {
  const { createStorage } = useLocalStorage(KEY_LOCAL_STORAGE.KEY);
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useAuth0();

  useEffect(() => {
    createStorage();
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  }
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shoppingcart' element={<ShoppingCart />}></Route>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/orders' element={<Orders />} />
      <Route path='/dashboard/users' element={<Users />} />
      <Route path='/productform' element={<CreateProductForm />} />
      <Route path='/updateform/:id' element={<UpdateProductForm />} />
      <Route path='/products/:id' element={<Detail />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/aboutUs' element={<AboutUs />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
