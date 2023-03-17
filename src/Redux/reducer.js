import { GET_PRODUCTS, GET_USERS, GET_DETAIL } from './actions';

const initialState = {
    products: [],
    users: [],
    detail: {},
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
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
        default:
            return { ...state }
    }
}

export default reducer