
import { GET_PRODUCTS, GET_USERS, GET_DETAIL, SEARCH } from './actions';

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


export type ProductActionTypes = GetProductsAction | GetUsersAction | GetDetailAction | SearchProducts;

const initialState: State = {
    products: [],
    filteredProducts: [],
    users: [],
    detail: {} as Product,
};

const reducer = (state: State = initialState, action: ProductActionTypes): State => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload
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
            filteredProducts: state.products.filter((product) => product.descriptionName === action.payload)
        }

        default:
            return { ...state };
    }
};

export default reducer;
