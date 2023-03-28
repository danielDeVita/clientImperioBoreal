import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { Product, User, UserOrder, Review } from "../types.d";
import { RootState } from "./store";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_USERS = "GET_USERS";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH = "SEARCH";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PAYMENTOTAL = 'GET_PAYMENTOTAL';
export const GET_ORDERS_BY_USER = 'GET_ORDERS_BY_USER';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_REVIEWS_BY_PRODUCT = 'GET_REVIEWS_BY_PRODUCT'
interface GETPaymentTotal {
  type: typeof GET_PAYMENTOTAL,
  payload: number
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
interface OrderByPrice {
  type: typeof ORDER_BY_PRICE;
  payload: "ascendente" | "descendente";
}

interface ResetFilters {
  type: typeof RESET_FILTERS;
  payload: "reset";
}
interface FilterByCategory {
  type: typeof FILTER_BY_CATEGORY;
  payload: string;
}
interface GetCategories {
  type: typeof GET_CATEGORIES;
  payload: String[];
}
interface GetOrdersByUser {
  type: typeof GET_ORDERS_BY_USER;
  payload: UserOrder[];
}

interface GetAllOrders {
  type: typeof GET_ALL_ORDERS;
  payload: UserOrder[];
}
interface GetReviewsByProduct {
  type: typeof GET_REVIEWS_BY_PRODUCT,
  payload: Review[]
}

export type ProductActionTypes =
  | GetProductsAction
  | GetUsersAction
  | GetDetailAction
  | SearchProducts
  | OrderByPrice
  | ResetFilters
  | FilterByCategory
  | GetCategories
  | GETPaymentTotal
  | GetOrdersByUser
  | GetAllOrders
  | GetReviewsByProduct

export const getPaymentTotal = (total: number) => {
  return { type: GET_PAYMENTOTAL, payload: total }
}

export const getProducts = (): ThunkAction<
  void,
  RootState,
  null,
  ProductActionTypes
> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    const response = await axios.get<Product[]>("/products");
    const products = response.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    const response = await axios.get<User[]>("/users");
    const users = response.data;
    dispatch({ type: GET_USERS, payload: users });
  };
};

export const getDetail = (id: number | string) => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      const response = await axios.get<Product>(`/products/${id}`);
      const detail = response.data;
      dispatch({ type: GET_DETAIL, payload: detail });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchProducts = (query: string) => {
  return { type: SEARCH, payload: query };
};

export const orderByPrice = (criteria: string) => {
  return { type: ORDER_BY_PRICE, payload: criteria };
};

export const resetFilters = (criteria: string) => {
  return { type: RESET_FILTERS, payload: criteria };
};

export const filterByCategory = (category: string) => {
  return { type: FILTER_BY_CATEGORY, payload: category };
};

export const getCategories = (): ThunkAction<
  void,
  RootState,
  null,
  ProductActionTypes
> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      const { data } = await axios.get("/products/categories");
      dispatch({ type: GET_CATEGORIES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUserOrders = (userId: string): ThunkAction<
  void,
  RootState,
  null,
  ProductActionTypes
> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      const { data } = await axios.get(`/orders/user/${userId}`)
      console.log(data);
      dispatch({ type: GET_ORDERS_BY_USER, payload: data })
    } catch (error) {
      console.error(error);
    }
  }
}

export const getAllOrders = (): ThunkAction<
  void,
  RootState,
  null,
  ProductActionTypes
> => {
  return async (dispatch: Dispatch<ProductActionTypes>) => {
    try {
      const { data } = await axios.get(`/orders`)
      dispatch({ type: GET_ALL_ORDERS, payload: data })
    } catch (error) {
      console.error(error);
    }
  }
}

export const getReviewsByProduct = (productId: string): ThunkAction<
void,
RootState,
null,
ProductActionTypes
> => {
  return async(dispatch:Dispatch<ProductActionTypes>) => {
    try {
      const { data } = await axios.get(`/reviews/${productId}`)
      dispatch({type: GET_REVIEWS_BY_PRODUCT, payload: data})
    } catch (error) {
      console.error(error);
    }
  }
}
