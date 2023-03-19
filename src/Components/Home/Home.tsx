import React from "react";
import NavBar from "../Navbar/Navbar";
import style from './Home.module.css';
import CardContainer from '../CardContainer/CardContainer';
import Footer from "../Footer/Footer";
import { getProducts } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";


const Home: React.FC = () => {

  const dispatch:AppDispatch = useDispatch();

  const handleReset = () => {
    dispatch(getProducts())

  }
  return (
    <>
      <NavBar />
      <button onClick={handleReset}>Resetear Productos</button>
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
