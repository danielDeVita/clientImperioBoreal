import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import style from './Home.module.css';
import CardContainer from '../CardContainer/CardContainer';
import AboutUs from "../AboutUs/AboutUs";
import Footer from "../Footer/Footer";


const Home: React.FC = () => {
  return (
    <>
      <NavBar />
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
