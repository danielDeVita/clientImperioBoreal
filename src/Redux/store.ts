import { createStore, applyMiddleware, compose, Store, Action } from "redux";
import reducer from "./reducer";
import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";
import { ProductActionTypes } from "./actions";

// Definir el tipo de estado raíz de la aplicación
export type RootState = ReturnType<typeof reducer>;

// Definir el tipo de la funcion dispatch de Redux
export type AppDispatch = ThunkDispatch<RootState, null, Action>;

// Habilita la extension de Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<RootState, ProductActionTypes> = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(
      thunkMiddleware as ThunkMiddleware<RootState, ProductActionTypes>
    )
  )
);
export default store;

// const store: Store<ReturnType<typeof reducer>, ProductActionTypes> = createStore(
//     reducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware as ThunkMiddleware<ReturnType<typeof reducer>, ProductActionTypes>))
// );
