import { Product, State, User } from "../types.d";
import {
  GET_PRODUCTS,
  GET_USERS,
  GET_DETAIL,
  SEARCH,
  ORDER_BY_PRICE,
  RESET_FILTERS,
  FILTER_BY_CATEGORY,
  GET_CATEGORIES,
} from "./actions";

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

export type ProductActionTypes =
  | GetProductsAction
  | GetUsersAction
  | GetDetailAction
  | SearchProducts
  | OrderByPrice
  | ResetFilters
  | FilterByCategory
  | GetCategories;

const initialState: State = {
  products: [],
  filteredProducts: [],
  users: [],
  detail: {} as Product,
  categories: [],
};

const reducer = (
  state: State = initialState,
  action: ProductActionTypes
): State => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
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
    case ORDER_BY_PRICE:
      const isDescendent = action.payload === "descendente";
      return {
        ...state,
        filteredProducts: [...state.filteredProducts].sort((a, b) => {
          if (isDescendent) {
            if (a.price < b.price) return 1;
            if (a.price > b.price) return -1;
            return 0;
          } else {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
          }
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
          (product) => product.category.categoryName === action.payload
        ),
      };
    case GET_CATEGORIES:
        return {
            ...state,
            categories: action.payload
        }
    default:
      return { ...state };
  }
};

export default reducer;
