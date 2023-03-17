import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//la linea de arriba permite conectar con redux devtools en el browser

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esto es para hacer peticiones a un server
);

export default store;