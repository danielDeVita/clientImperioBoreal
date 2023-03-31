import React from "react";
import style from "../Pagination/Pagination.module.css";
import { newPagination, PaginationProps } from "../../props.d";

const Pagination: React.FC<newPagination> = ({
  // productsPerPage,
  // allProducts,
  // paginado,
  // currentPage
  handleNextbtn,
  handlePrevbtn,
  currentPage,
  pages,
  pageDecrementBtn,
  pageIncrementBtn,
  renderPageNumbers,
}) => {
  // const pageNumbers: number[] = [];

  // for(let i=1; i<= Math.ceil(allProducts/productsPerPage); i++){
  //     pageNumbers.push(i)
  // }

  // const nextPage = () => {
  //     paginado(currentPage + 1);
  // }

  // const prevPage = () => {
  //     paginado(currentPage - 1);
  // }

  return (
    // <nav className={style.paginadoNavContainer}>
    //      {pageNumbers.length > 1 && (
    //     <ul className={style.paginadoList} >
    //       {currentPage > 1 ? (
    //         <button className={style.btn} onClick={prevPage}>Anterior</button>
    //         ) : (
    //             <button hidden className={style.btn}>Anterior</button>
    //         )}
    //         { pageNumbers &&
    //                 pageNumbers.map(number =>(
    //             <li onClick={() => paginado(number)} key={number} className={`${style.number} ${currentPage === number && style.active}`}>
    //                 <a>{number}</a>
    //             </li>
    //         ))
    //         }
    //         <li>
    //             <button className={style.btn} onClick={nextPage} disabled={currentPage === Math.ceil(allProducts/productsPerPage)}>Siguiente</button>
    //         </li>
    //     </ul>
    //     )}
    // </nav>
    <>
      <div className={style.paginadoNavContainer}>
      {pages.length > 1 && (
        <ul className={style.paginadoList}>
          <li>
          {currentPage > 1 ? (
            <button
              className={style.btn}
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              Anterior
            </button>
          ) : (
              <button hidden className={style.btn}>Anterior</button>
          )}</li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}
              
          <li>
            <button
              className={style.btn}
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
              >
              Siguiente
            </button>
          </li>
        </ul>
        )}
      </div>
    </>
  );
};

export default Pagination;
