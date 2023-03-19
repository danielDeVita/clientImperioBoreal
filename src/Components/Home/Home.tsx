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


interface Product {
  descriptionName: string;
  category: string;
  price: number;
  priceBusiness: number;
  priceVAT: number;
  priceVATBusiness: number;
}
interface Props {
  productsPerPage: number;
  allProducts: Product[]; // suponiendo que tienes un tipo de datos llamado Product para tus productos
  paginado: (pageNumber: number) => void;
  currentPage: number;
}

const Home: React.FC = () => {

  const dispatch:AppDispatch = useDispatch();
 

  const handleReset = (e:any) => {
    dispatch(resetFilters(e.target.value))

  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderByPrice(e.target.value))
  }

//////Paginado
  const allProducts = useSelector((state: RootState) => state.filteredProducts);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(3);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginado = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


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
        <CardContainer currentProducts={currentProducts} />
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
    </>
  );
};

export default Home;
