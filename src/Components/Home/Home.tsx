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
import stylePag from "../Pagination/Pagination.module.css";
import Carousel from "../Carousel/Carousel";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "auth0";
import axios from "axios";
import { CartContext } from "../../context";
import { CartContextType, Product } from "../../types.d";

const Home: React.FC = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0<User>();

  const { setUserId, setUser } = useContext(CartContext) as CartContextType;

  const postNewUser = async () => {
    if (isAuthenticated) {
      const { data } = await axios.post("/users", user);
      setUser(data.isAdmin);
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
  // ================ Pagination =============================================
  const [currentItems, setCurrentItems] = useState<Array<any>>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);

  const [pageNumberLimit, setPageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    setCurrentPage(Number(event.currentTarget.id));
  };
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(allProducts?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirsttItem = indexOfLastItem - itemsPerPage;

  const renderPageNumbers = pages.map((number) => {
    const isActive = currentPage === number;
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={String(number)}
          onClick={handleClick}
          className={`${stylePag.number} ${isActive ? stylePag.active : undefined
            }`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = (): void => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = (): void => {
    setCurrentPage(currentPage - 1);

    if (
      (currentPage - 1) % pageNumberLimit === 0 &&
      maxPageNumberLimit > pageNumberLimit
    ) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className={stylePag.hellipBtn} onClick={handleNextbtn}>
        &hellip;
      </li>
    );
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className={stylePag.hellipBtn} onClick={handlePrevbtn}>
        &hellip;
      </li>
    );
  }

  const [selectedOption, setSelectedOption] = useState<string>("default");
  const [selectedOptionOrder, setSelectedOptionOrder] =
    useState<string>("default");

  useEffect(() => {
    setCurrentItems(allProducts?.slice(indexOfFirsttItem, indexOfLastItem));
    postNewUser();
    dispatch(ResetReviewsByProduct());
  }, [allProducts, indexOfFirsttItem, indexOfLastItem]);

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
      <Pagination
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        currentPage={currentPage}
        pages={pages}
        pageDecrementBtn={pageDecrementBtn}
        pageIncrementBtn={pageIncrementBtn}
        renderPageNumbers={renderPageNumbers}
      />
      {currentItems?.length === 0 ? (
        <div className={style.searchError}>
          No existe el producto solicitado!
        </div>
      ) : (
        <div className='card-container'>
          <CardContainer productsFiltered={currentItems} />
        </div>
      )}

      <Pagination
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        currentPage={currentPage}
        pages={pages}
        pageDecrementBtn={pageDecrementBtn}
        pageIncrementBtn={pageIncrementBtn}
        renderPageNumbers={renderPageNumbers}
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
