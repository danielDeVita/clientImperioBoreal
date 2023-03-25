import React from "react";
import style from "../Pagination/Pagination.module.css";
import { PaginationProps } from '../../props.d'

const Pagination: React.FC<PaginationProps> = ({productsPerPage, allProducts, paginado, currentPage }) => {
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
             {pageNumbers.length > 1 && (
            <ul className={style.paginadoList} >
              {currentPage > 1 ? (
                <button className={style.btn} onClick={prevPage}>Anterior</button>
                ) : ( 
                    <button hidden className={style.btn}>Anterior</button>
                )}
                { pageNumbers && 
                        pageNumbers.map(number =>(                  
                    <li onClick={() => paginado(number)} key={number} className={`${style.number} ${currentPage === number && style.active}`}>
                        <a>{number}</a>  
                    </li>
                ))
                }
                <li>
                    <button className={style.btn} onClick={nextPage} disabled={currentPage === Math.ceil(allProducts/productsPerPage)}>Siguiente</button>
                </li>
            </ul>
            )}
        </nav>

    )
}

export default Pagination;
