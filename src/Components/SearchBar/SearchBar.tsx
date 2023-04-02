import React, { useState, ChangeEvent, FormEvent } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { searchProducts } from "../../Redux/actions";
import { AppDispatch } from "../../Redux/store";
interface SearchBarProps {
  setCurrentPage: (pageNumber: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setCurrentPage }) => {
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
    // Do something with the query here, like search for it
    // const response: AxiosResponse<Product[]> = await axios.get(
    //   `/products?name=${query}`
    // );
    // let productsFound = response.data;
    // setProducts(productsFound);

    dispatch(searchProducts(query));
    setCurrentPage(1);
    setQuery("");
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          className={style.searcher}
          type='search'
          placeholder='Buscar productos...'
          onChange={handleChange}
          value={query}
        />
        <button className={style.searchBtnStyle} type='submit'>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
      </form>
    </>
  );
};

export default SearchBar;
