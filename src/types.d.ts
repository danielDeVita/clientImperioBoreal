export interface Errors {
  descriptionName?: string;
  category?: string;
  price?: string;
  priceBusiness?: string;
  priceVAT?: string;
  priceVATBusiness?: string;
}

export interface Product {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
    image: string
}

export interface ProductWithoutImage extends Omit<Product, 'image'> {}

export interface ProductToDashboard extends ProductWithoutImage {
    readonly _id: string;
}

export interface DetailParams {
    id: string;
    [key: string]: string | undefined;
  }

export interface RootState {
    detail: Product;
}

// --------------- REDUX ----------------------

interface User {
  first_name: string,
  password: string,
  email: string,
  isAdmin: boolean,
}

export enum ACTIONS_TYPE {
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_USERS = "GET_USERS",
  GET_DETAIL = "GET_DETAIL",
  SEARCH = 'SEARCH',
  ORDER_BY_PRICE = 'ORDER_BY_PRICE',
  RESET_FILTERS = 'RESET_FILTERS',
  FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'
}

interface GetProductsAction {
    type: string;
    payload: ProductWithoutImage[];
  }
  
  interface GetUsersAction {
    type: string;
    payload: User[];
  }
  
  interface GetDetailAction {
    type: string;
    payload: ProductWithoutImage;
  }
  
  interface SearchProducts {
    type: string;
    payload: Product[];
  }
  interface OrderByPrice {
    type: string;
    payload: 'ascendente' | 'descendente';
  }
  
  interface ResetFilters {
    type: string;
    payload: 'reset';
  }
  interface FilterByCategory {
    type: string;
    payload: string;  
  }
  
  export type ProductActionTypes = GetProductsAction | GetUsersAction | GetDetailAction | SearchProducts | OrderByPrice | ResetFilters | FilterByCategory;

export interface State {
    products: ProductWithoutImage[];
    filteredProducts: ProductWithoutImage[];
    users: User[];
    detail: ProductWithoutImage;    
}