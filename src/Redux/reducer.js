import { GET_PRODUCTS, GET_USERS, } from './actions';

const initialState = {
    products: [],
    users: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return { ...state }
    }
}

export default reducer