import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from './Home.module.css';


const Home: React.FC = () => {
  return (
    <>
    <img alt="logo" src="./" />
      <div className={style.searchbarContainer}>
        <SearchBar />
        <h3>Aca va cardContainer</h3>
        {/*aca iria el cardContainer donde se renderiza cada card de cada producto.*/}

      </div>
      <div className="card-container"></div>
    </>
  );
};

export default Home;
