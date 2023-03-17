import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_USERS = "GET_USERS";

export const getProducts = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/products")
        const products = response.data;
        dispatch({ type: GET_PRODUCTS, payload: products })
    }
};
export const getUsers = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/users")
        const users = response.data;
        dispatch({ type: GET_PRODUCTS, payload: users })
    }
};