import { ProductWithOutImage, DetailInterface } from './types.d'

export interface CardProp extends DetailInterface{
   id:string
}

export interface productProps {
  productProps: ProductWithOutImage[];
}

export interface PaginationProps {
  productsPerPage: number;
  allProducts: any;
  paginado: (pageNumber: number) => void;
  currentPage: number;
}