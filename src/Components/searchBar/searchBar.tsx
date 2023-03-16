import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const searchBar: React.FC = () => {
    const [query, setQuery] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with the query here, like search for it
        let response = await axios.get(`http://localhost:3001/products?query=${query}`)
        let product = response.data
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

export default searchBar;
