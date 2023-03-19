import React from "react";
import NavBar from "../Navbar/Navbar";
import style from './Home.module.css';
import CardContainer from '../CardContainer/CardContainer';
import Footer from "../Footer/Footer";
import { resetFilters, orderByPrice } from "../../Redux/actions";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../Redux/store";



const Home: React.FC = () => {

  const dispatch:AppDispatch = useDispatch();
 

  const handleReset = (e:any) => {
    dispatch(resetFilters(e.target.value))

  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderByPrice(e.target.value))
  }
  return (
    <>
      <NavBar />
      <button onClick={(e) => handleReset(e)} value='reset'>Resetear Productos</button>
      <select name="orderByPrice" id="orderByPrice" defaultValue={"default"} onChange={(e) => selectHandler(e)}>
        <option value="default" disabled>Ordenar por Precio</option>
        <option value="ascendente">Ascendente</option>
        <option value="descendente">Descendente</option>
      </select>
      <div className="card-container">
        <CardContainer />
      </div>
      <div className={style.footerContainer}>
      <Footer />
      </div>
    </>
  );
};

export default Home;
