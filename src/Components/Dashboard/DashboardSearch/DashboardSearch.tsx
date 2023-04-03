import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { dashboardSearch } from "../../../Redux/actions";
import style from './DashboardSearch.module.css'

interface SearchBarProps {
  setCurrentPage: (pageNumber: number) => void;
}

const DashboardSearch: React.FC<SearchBarProps> = ({ setCurrentPage }) => {
  interface Product {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
  }

  const dispatch: AppDispatch = useDispatch();

  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(dashboardSearch(query));
    setCurrentPage(1);
    setQuery("");
  };

  return (
    <>
    <div className={style.formContainer}>
      <form className={style.actualForm}onSubmit={handleSearch}>
        <input
          className={style.searcher}
          type="search"
          placeholder='Buscar productos...'
          onChange={handleChange}
          value={query}
        />
        <button type='submit' className={style.searchBtnStyle}>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
      </form>
      </div>
    </>
  );
};

export default DashboardSearch;
