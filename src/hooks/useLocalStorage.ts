import { Product, CartContextType } from "../types.d";
import { useContext } from "react";
import { CartContext } from "../context/index";
import { useDispatch } from "react-redux";
import { getPaymentTotal } from '../Redux/actions'

const useLocalStorage = (KEY: string) => {
  const { setTotalCart } = useContext(CartContext) as CartContextType;
  const dispatch = useDispatch()
  const createStorage = () => {
    if (!localStorage.getItem(KEY)) {
      localStorage.setItem(KEY, "[]");
    }
  };

  const getLocalStorage = () => {
    const values = JSON.parse(localStorage.getItem(KEY) as string);
    return values;
  };

  const setItmes = (values: Product) => {
    const products = getLocalStorage();
    products.push(values);
    localStorage.setItem(KEY, JSON.stringify(products));
    getTotal();
  };

  const loadPayment = () => {
     const values = getLocalStorage()
     const total = values?.reduce((prev: number, current:Product) => prev += (current?.price * (current?.quantity as number)), 0)
     dispatch(getPaymentTotal(total))
  }

  const updateQuantity = (_id: string, qty: number) => {
    const values = getLocalStorage()
    const index = values?.findIndex((item: Product) => item?._id === _id)
    values[index].quantity = qty
    localStorage.setItem(KEY, JSON.stringify(values))
    loadPayment()
  }

  const deleteItems = (id: string) => {
    const products = getLocalStorage();
    const filteredProducst = products?.filter(
      (item: Product) => item?._id !== id
    );
    localStorage.setItem(KEY, JSON.stringify(filteredProducst));
    getTotal();
    loadPayment()
  };

  const clearStorage = () => {
    createStorage();
  };

  const validateProducst = (id: string): boolean => {
    const products = getLocalStorage();
    return products?.some((item: Product) => item?._id === id);
  };

  function getTotal() {
    const values = getLocalStorage();
    setTotalCart(values?.length);
  }

  return {
    getLocalStorage,
    createStorage,
    setItmes,
    deleteItems,
    clearStorage,
    validateProducst,
    getTotal,
    loadPayment,
    updateQuantity
  };
};

export default useLocalStorage;
