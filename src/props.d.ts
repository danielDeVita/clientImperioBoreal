// import { ProductWithOutImage, DetailInterface } from './types.d'

import { Product } from "./types.d";

// export interface CardProp extends DetailInterface{
//    id:string
// }

export interface productProps {
  productsFiltered: Product[];
}

export interface PaginationProps {
  productsPerPage: number;
  allProducts: number;
  paginado: (pageNumber: number) => void;
  currentPage: number;
}
