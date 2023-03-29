import React, { useEffect, useState, useContext } from "react";
import NavBar from "../Navbar/Navbar";
import style from "./Home.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import {
  resetFilters,
  orderByPrice,
  filterByCategory,
  ResetReviewsByProduct,
} from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Carousel from "../Carousel/Carousel";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "auth0";
import axios from "axios";
import { CartContext } from "../../context";
import { CartContextType } from "../../types.d";

const Home: React.FC = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0<User>();

  const { setUserId } = useContext(CartContext) as CartContextType;

  const postNewUser = async () => {
    if (isAuthenticated) {
      const { data } = await axios.post("/users", user);
      const { _id } = data;
      setUserId(_id);
    }
  };

  const dispatch = useDispatch();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(resetFilters(e.currentTarget.value));
    setSelectedOption("default");
    setSelectedOptionOrder("default");
    setCurrentPage(1);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderByPrice(e.target.value));
    setSelectedOptionOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByCategory(e.target.value));
    setSelectedOption(e.target.value);
    setCurrentPage(1);
  };

  const allProducts = useSelector((state: RootState) => state.filteredProducts);
  const categories = useSelector((state: RootState) => state.categories);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginado = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionOrder, setSelectedOptionOrder] = useState<string>("");

  useEffect(() => {
    setSelectedOption("default");
    setSelectedOptionOrder("default");
    postNewUser();
    dispatch(ResetReviewsByProduct());
  }, []);

  return (
    <>
      <NavBar setCurrentPage={setCurrentPage} />
      <div className={style.filterOrderContainer}>
        <select
          className={style.priceOrderSelectorStyle}
          name='orderByPrice'
          id='orderByPrice'
          onChange={selectHandler}
          value={selectedOptionOrder}
        >
          <option value='default' disabled>
            Ordenar por Precio
          </option>
          <option className={style.orderOptionStyle} value='ascendente'>
            Ascendente
          </option>
          <option className={style.orderOptionStyle} value='descendente'>
            Descendente
          </option>
        </select>
        <select
          className={style.CategorySelectorStyle}
          onChange={handleCategory}
          name='filterByCategory'
          id='filterByCategory'
          value={selectedOption}
        >
          <option
            className={style.categoryOptionStyle}
            value='default'
            disabled
          >
            Categorias
          </option>
          {categories.map((category: any, index) => {
            return (
              <option
                key={index}
                className={style.categoryOptionStyle}
                value={category.category}
              >
                {category.category}
              </option>
            );
          })}
        </select>
        <button
          className={style.resetFiltersBtn}
          onClick={handleReset}
          value='reset'
        >
          Resetear Productos
        </button>
      </div>
      <Carousel />
      <div className='card-container'>
        <CardContainer productsFiltered={currentProducts} />
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        allProducts={allProducts.length}
        paginado={paginado}
        currentPage={currentPage}
      />
      <div className={style.footerContainer}>
        <Footer />
        <p className={style.finalFrase}>
          {" "}
          <Link className={style.linkourteam} to='/OurTeam'>
            Conoce a los desarrolladores que crearon esta Web
          </Link>
        </p>
      </div>
    </>
  );
};

export default Home;
