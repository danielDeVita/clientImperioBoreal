import React from "react";
import SearchBar from "../searchBar/SearchBar";
import style from './Home.module.css'

const Home = () => {
  return (
    <>
    <img alt="logo" src="./" />
      <div className={style.searchbarContainer}>
        <SearchBar />
      </div>
      <div className="card-container"></div>
    </>
  );
};

export default Home;
