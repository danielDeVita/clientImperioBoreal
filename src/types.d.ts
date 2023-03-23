export interface Product {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
    image: File | null;
}




export interface ProductWithOutImage extends Omit<Product, 'image'> {}

export interface OldProduct extends ProductWithOutImage {
    readonly _id: string;
}

export interface ProductToStorage extends Omit<Product, 'image'> {
    readonly id: string;
    image: {
        public_id: string;
        secure_url: string;
    }
}

export interface Errors {
    descriptionName?: string;
    category?: string;
    price?: string;
    priceBusiness?: string;
    priceVAT?: string;
    priceVATBusiness?: string;
  }


export interface ProductToDashboard extends ProductWithOutImage{
    readonly _id: string;
}

export interface DetailParams {
    id: string;
    [key: string]: string | undefined;
}

interface DetailInterface extends ProductWithOutImage {
    image: {
      public_id: string;
      secure_url: string;
    };
}

export interface RootState {
    detail: DetailInterface  
}

export enum KEY_LOCAL_STORAGE {
    KEY = 'CART_PRODUCT'
}

export interface CartContextType {
    totalCart: number;
    setTotalCart: (count:number) => void;
}