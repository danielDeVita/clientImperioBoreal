export interface Product {
  _id?: string;
  descriptionName: string;
  category: {
    _id: string;
    categoryName: string;
  };
  price: number;
  image: {
    public_id: string;
    secure_url: string;
  };
}
export interface UpProductForm {
  descriptionName: string;
  category: string;
  price: number;
  image?: File | null
}
export interface TouchedProductForm {
  descriptionName: boolean;
  category: boolean;
  price: boolean;
  image?: boolean; 
}
export interface ShoppingCartInteface
  extends Pick<Product, "descriptionName" | "category" | "price"> {
  readonly id: string;
  image: string;
}
export interface Errors {
  descriptionName?: string;
  category?: string;
  price?: string;
  image?: string
}
export interface DetailParams {
  id: string;
  [key: string]: string | undefined;
}
export enum KEY_LOCAL_STORAGE {
  KEY = "CART_PRODUCT",
}
export interface CartContextType {
  totalCart: number;
  setTotalCart: (count: number) => void;
}
export interface User {
  name: String;
  password: String;
  email: String;
  isAdmin: Boolean;
}
export interface State {
  products: Product[];
  filteredProducts: Product[];
  users: User[];
  detail: Product;
  categories: String[];
}
