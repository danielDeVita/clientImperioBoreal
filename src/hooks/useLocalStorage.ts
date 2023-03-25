import { Product, CartContextType } from "../types.d";
import { useContext } from "react";
import { CartContext } from "../context/index";

const useLocalStorage = (KEY: string) => {
  const { setTotalCart } = useContext(CartContext) as CartContextType;
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

  const deleteItems = (id: string) => {
    const products = getLocalStorage();
    const filteredProducst = products?.filter(
      (item: Product) => item?._id !== id
    );
    localStorage.setItem(KEY, JSON.stringify(filteredProducst));
    getTotal();
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
  };
};

export default useLocalStorage;
