import React, { useState, ChangeEvent, FormEvent } from 'react';

const searchBar: React.FC = () => {
    const [query, setQuery] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with the query here, like search for it
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="search" placeholder='Buscar...' onChange={handleChange} value={query} />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default searchBar;
