import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_USERS = "GET_USERS";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH = 'SEARCH';

interface Product {
  descriptionName: string;
  category: string;
  price: number;
  priceBusiness: number;
  priceVAT: number;
  priceVATBusiness: number;
}

interface User {
  first_name: String,
  password: String,
  email: String,
  isAdmin: Boolean,
}

interface GetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: Product[];
}

interface GetUsersAction {
  type: typeof GET_USERS;
  payload: User[];
}

interface GetDetailAction {
  type: typeof GET_DETAIL;
  payload: Product;
}

interface SearchProducts {
  type: typeof SEARCH;
  payload: Product[];
}

export type ProductActionTypes = GetProductsAction | GetUsersAction | GetDetailAction | SearchProducts;

export const getProducts = (): ThunkAction<void, RootState, null, ProductActionTypes> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    const response = await axios.get<Product[]>("http://localhost:3001/products");
    const products = response.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
  }
};

export const getUsers = (): ThunkAction<void, RootState, null, ProductActionTypes> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    const response = await axios.get<User[]>("http://localhost:3001/users");
    const users = response.data;
    dispatch({ type: GET_USERS, payload: users });
  }
};

export const getDetail = (id: number | string): ThunkAction<void, RootState, null, ProductActionTypes> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      const response = await axios.get<Product>(`http://localhost:3001/products/${id}`);
      const detail = response.data;
      dispatch({ type: GET_DETAIL, payload: detail });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchProducts = (query: string) => {
  return {type: SEARCH, payload: query}
} 