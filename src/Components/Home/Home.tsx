import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import style from './Home.module.css';
import CardContainer from '../CardContainer/CardContainer';
import Footer from "../Footer/Footer";
import { resetFilters, orderByPrice, filterByCategory } from "../../Redux/actions";
import { useDispatch} from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from 'react-redux';
import Pagination from "../Pagination/Pagination"

const Home: React.FC = () => {

  const dispatch = useDispatch();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(resetFilters(e.currentTarget.value));
    setSelectedOption('default');
    setSelectedOptionOrder('default')
    setCurrentPage(1);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderByPrice(e.target.value));
    setSelectedOptionOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByCategory(e.target.value));
    setSelectedOption(e.target.value)
    setCurrentPage(1);


  };

  const allProducts = useSelector((state: RootState) => state.filteredProducts);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginado = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOptionOrder, setSelectedOptionOrder] = useState<string>('');


  useEffect(() => {
    setSelectedOption('default')
    setSelectedOptionOrder('default')
  }, [])
  return (
    <>
    <NavBar setCurrentPage={setCurrentPage} />
      <button onClick={handleReset} value="reset">
        Resetear Productos
      </button>
      <select
        name="orderByPrice"
        id="orderByPrice"
        defaultValue="default"
        onChange={selectHandler}
        value={selectedOptionOrder}
      >
        <option value="default" disabled>
          Ordenar por Precio
        </option>
        <option value="ascendente">Ascendente</option>
        <option value="descendente">Descendente</option>
      </select>

      <select
        onChange={handleCategory}
        name="filterByCategory"
        id="filterByCategory"
        value={selectedOption}
      >
        <option value="default" disabled>Categorias</option>
        <option value="lapiz">Lapices</option>
        <option value="resmas">Resmas</option>
        <option value="agenda">Agendas</option>
        <option value="oficina">Articulos de oficina</option>
        <option value="lapicera">Lapiceras</option>
        <option value="escolar">Escolares</option>
      </select>
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
    </>
  );
};

export default Home;
