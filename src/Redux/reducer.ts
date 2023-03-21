
import { ACTIONS_TYPE } from '../types.d'

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

interface State {
    products: Product[];
    filteredProducts: Product[];
    users: User[];
    detail: Product;    
}

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
    payload: any;
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

const initialState: State = {
    products: [],
    filteredProducts: [],
    users: [],
    detail: {} as Product,
};

const reducer = (state: State = initialState, action: ProductActionTypes): State => {
    switch (action.type) {
        case ACTIONS_TYPE.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload
            };
        case ACTIONS_TYPE.GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case ACTIONS_TYPE.GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
        case ACTIONS_TYPE.SEARCH: 
        return {
            ...state, 
            filteredProducts: state.products.filter((product) => product.descriptionName.toLowerCase().includes(action.payload.toLowerCase()))
        }
        case ACTIONS_TYPE.ORDER_BY_PRICE:
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
      case ACTIONS_TYPE.RESET_FILTERS:
        return {
            ...state,
            filteredProducts: state.products
        }
        case ACTIONS_TYPE.FILTER_BY_CATEGORY:
            return {
                ...state,
                filteredProducts: [...state.products].filter((product) => product.category === action.payload)

        
            }
        default:
            return { ...state };
    }
};

export default reducer;
