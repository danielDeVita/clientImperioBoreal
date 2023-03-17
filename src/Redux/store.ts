import { createStore, applyMiddleware, compose, Store } from "redux";
import reducer from "./reducer";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { ProductActionTypes } from "./actions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<ReturnType<typeof reducer>, ProductActionTypes> = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware as ThunkMiddleware<ReturnType<typeof reducer>, ProductActionTypes>))
);

export default store;
