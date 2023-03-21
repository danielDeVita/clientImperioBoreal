import { ProductWithOutImage } from './types.d'

export interface CardProp {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
    id: string;
    img: string;
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