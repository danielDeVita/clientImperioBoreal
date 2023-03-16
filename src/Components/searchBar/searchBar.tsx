import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const SearchBar: React.FC = () => {

    interface Product {
        descriptionName: string;
        category: string;
        price: number;
        priceBusiness: number;
        priceVAT: number;
        priceVATBusiness: number;
    }

    const [query, setQuery] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with the query here, like search for it
        let response = await axios.get(`http://localhost:3001/products?query=${query}`)
        let productsFound = response.data
        console.log(productsFound)
        setProducts(productsFound)
        console.log(products)
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="search" placeholder='Buscar...' onChange={handleChange} value={query} />
                <button type="submit">Buscar</button>
            </form>
        </>

    );
};

export default SearchBar;
