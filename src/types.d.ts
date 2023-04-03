export interface Product {
  _id?: string;
  descriptionName: string;
  category?: {
    _id: string;
    categoryName: string;
  };
  stock?: number | undefined;
  price: number;
  quantity?: number;
  image?: {
    public_id: string;
    secure_url: string;
  };
}
export interface UserOrder {
  user: {
    _id: string,
    email: string
  }
  status: string,
  cart: {
    products: Product[];
    totalAmount: number,
  }
  orderId: string,
}
export interface Review {
  _id: string,
  userId: {
    _id: string,
    email: string,
    isAdmin: boolean,
    isDeleted: false,
  }
  product: {
    _id: string,
    descriptionName: string
  }
  rating: string | number,
  comment: string,
  createdAt: string
}
export interface UpProductForm {
  descriptionName: string;
  category?: string | {}
  price: number;
  stock: number
  image?: File | null
}
export interface TouchedProductForm {
  descriptionName: boolean;
  category?: boolean;
  price: boolean;
  stock?: boolean,
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
  stock?: string;
  image?: string;
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
  userId: string;
  setUserId: (id: string) => void;
  user: string;
  setUser: (mail: string) => void;
}
export interface User {
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
  username?: string;
  _id?: string;
}
export interface State {
  payment: number
  products: Product[];
  filteredProducts: Product[];
  users: User[];
  detail: Product;
  categories: String[];
  ordersByUser: UserOrder[],
  orders: UserOrder[]
  productReviews: Review[]
  dashboardProducts: Product[]
}
