import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { ProductWithoutImage as Product, User, ACTIONS_TYPE } from '../types.d'

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_USERS = "GET_USERS";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH = 'SEARCH';
export const ORDER_BY_PRICE = 'ORDER_BY_PRICE';
export const RESET_FILTERS = 'RESET_FILTERS';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';


interface GetProductsAction {
  type: string;
  payload: Product[];
}

interface GetUsersAction {
  type: string;
  payload: User[];
}

interface GetDetailAction {
  type: string;
  payload: Product;
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

export const getProducts = (): ThunkAction<void, RootState, null, ProductActionTypes> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    const response = await axios.get<Product[]>("http://localhost:3001/products");
    const products = response.data;
    dispatch({ type: ACTIONS_TYPE.GET_PRODUCTS, payload: products });
  }
};

export const getUsers = () => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    const response = await axios.get<User[]>("http://localhost:3001/users");
    const users = response.data;
    dispatch({ type: ACTIONS_TYPE.GET_USERS, payload: users });
  }
};

export const getDetail = (id: number | string) => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      const response = await axios.get<Product>(`http://localhost:3001/products/${id}`);
      const detail = response.data;
      console.log(detail);
      dispatch({ type: ACTIONS_TYPE.GET_DETAIL, payload: detail });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchProducts = (query: string) => {
  return {type: ACTIONS_TYPE.SEARCH, payload: query}
} 

export const orderByPrice = (criteria: string) => {
  return {type: ACTIONS_TYPE.ORDER_BY_PRICE, payload: criteria}
}

export const resetFilters = (criteria: string) => {
  return {type: ACTIONS_TYPE.RESET_FILTERS, payload: criteria}
}

export const filterByCategory = (category: string) => {
  return {type: ACTIONS_TYPE.FILTER_BY_CATEGORY, payload: category}
}