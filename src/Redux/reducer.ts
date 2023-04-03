import { Product, State, User, UserOrder, Review } from "../types.d";
import {
  GET_PRODUCTS,
  GET_USERS,
  GET_DETAIL,
  SEARCH,
  ORDER_BY_PRICE,
  RESET_FILTERS,
  FILTER_BY_CATEGORY,
  GET_CATEGORIES,
  GET_PAYMENTOTAL,
  GET_ORDERS_BY_USER,
  GET_ALL_ORDERS,
  GET_REVIEWS_BY_PRODUCT,
  RESET_REVIEWS_BY_PRODUCT,
  RESET_DETAIL,
  DASHBOARD_SEARCH
} from "./actions";

interface GETPaymentTotal {
  type: typeof GET_PAYMENTOTAL
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
  payload: any;
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

interface ResetReviewsByProduct {
  type: typeof RESET_REVIEWS_BY_PRODUCT,
  payload: []
}

interface ResetDetail {
  type: typeof RESET_DETAIL,
  payload: {}
}

interface DashboardSearch {
  type: typeof DASHBOARD_SEARCH;
  payload: any;
}

export type ProductActionTypes =
  | GetProductsAction
  | GetUsersAction
  | GetDetailAction
  | SearchProducts
  | OrderByPrice
  | ResetFilters
  | FilterByCategory
  | GETPaymentTotal
  | GetCategories
  | GetOrdersByUser
  | GetAllOrders
  | GetReviewsByProduct
  | ResetReviewsByProduct
  | ResetDetail
  | DashboardSearch

const initialState: State = {
  products: [],
  filteredProducts: [],
  users: [],
  detail: {} as Product,
  categories: [],
  payment: 0,
  ordersByUser: [],
  orders: [],
  productReviews: [],
  dashboardProducts: []
};

const reducer = (
  state: State = initialState,
  action: ProductActionTypes
): State => {
  switch (action.type) {
    case GET_PAYMENTOTAL:
      return {
        ...state,
        payment: action.payload
      }
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        dashboardProducts: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        filteredProducts: state.products.filter((product) =>
          product.descriptionName
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ),
      };
    case DASHBOARD_SEARCH: 
    return {
      ...state,
      dashboardProducts: state.products.filter((product) =>
        product.descriptionName
        .toLowerCase()
        .includes(action.payload.toLowerCase())
      )
    }
    case ORDER_BY_PRICE:
      const isDescendent = action.payload === "descendente";
      return {
        ...state,
        filteredProducts: [...state.filteredProducts].sort((a, b) => {
          if (isDescendent) return b.price - a.price;
          return a.price - b.price;
        }),
      };
    case RESET_FILTERS:
      return {
        ...state,
        filteredProducts: state.products,
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        filteredProducts: [...state.products].filter(
          (product) => product.category?.categoryName === action.payload
        ),
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case GET_ORDERS_BY_USER:
      return {
        ...state,
        ordersByUser: action.payload
      }
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case GET_REVIEWS_BY_PRODUCT:
      return {
        ...state,
        productReviews: action.payload
      }
    case GET_REVIEWS_BY_PRODUCT:
      return {
        ...state,
        productReviews: action.payload
      }
    case RESET_REVIEWS_BY_PRODUCT:
      return {
        ...state,
        productReviews: action.payload
      }
    case RESET_DETAIL:
      return {
        ...state,
        detail: action.payload as Product
      }
    default:
      return { ...state };
  }
};

export default reducer;
