import React from "react";
import style from "../Pagination/Pagination.module.css";

interface PaginationProps {
  productsPerPage: number;
  allProducts: any;
  paginado: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({productsPerPage, allProducts, paginado, currentPage}) => {
    const pageNumbers: number[] = [];

    for(let i=1; i<= Math.ceil(allProducts/productsPerPage); i++){
        pageNumbers.push(i)  
    }

    const nextPage = () => {
        paginado(currentPage + 1);
    }
    
    const prevPage = () => {
        paginado(currentPage - 1);
    }
    
    return(
        <nav className={style.paginadoNavContainer}>
            <ul className={style.paginadoList} >
                <li>
                    <button className={style.btn} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                </li>
                { pageNumbers && 
                        pageNumbers.map(number =>(                  
                    <li key={number} className={`${style.number} ${currentPage === number && style.active}`}>
                        <a onClick={() => paginado(number)}>{number}</a>  
                    </li>
                ))
                }
                <li>
                    <button className={style.btn} onClick={nextPage} disabled={currentPage === Math.ceil(allProducts/productsPerPage)}>Next</button>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination;
