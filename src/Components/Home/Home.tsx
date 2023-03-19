import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";
import style from './Home.module.css';
import CardContainer from '../CardContainer/CardContainer';
import Footer from "../Footer/Footer";
import { resetFilters, orderByPrice } from "../../Redux/actions";
import { useDispatch} from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from 'react-redux';
import Pagination from "../Pagination/Pagination"

const Home: React.FC = () => {

  const dispatch:AppDispatch = useDispatch();
 

  const handleReset = (e:any) => {
    dispatch(resetFilters(e.target.value))
    setCurrentPage(1);
  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderByPrice(e.target.value))
    setCurrentPage(1);
  }

//////Paginado
  const allProducts = useSelector((state: RootState) => state.filteredProducts);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginado = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
    <div className={style.homeContainer}>
      <NavBar />
      <div className={style.filtersContainer}>
      <select className={style.selectOrderStyle} name="orderByPrice" id="orderByPrice" defaultValue={"default"} onChange={(e) => selectHandler(e)}>
        <option className={style.selectOptioonStyle} value="default" disabled>Ordenar por Precio</option>
        <option className={style.selectOptioonStyle}  value="ascendente">Ascendente</option>
        <option className={style.selectOptioonStyle}  value="descendente">Descendente</option>
      </select>
      <button className={style.resetFiltersBtnStyle} onClick={(e) => handleReset(e)} value='reset'>Mostrar todo</button>
      </div>
      <div className="card-container">
        <CardContainer productProps={currentProducts} />
      </div>
      <Pagination
      productsPerPage={productsPerPage}
      allProducts={allProducts.length}
      paginado={paginado}
      currentPage={currentPage}
    />
      <div className={style.footerContainer}>
      <Footer />
      </div>
    </div>
    </>
  );
};

export default Home;
