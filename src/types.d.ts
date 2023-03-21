export interface Errors {
  descriptionName?: string;
  category?: string;
  price?: string;
  priceBusiness?: string;
  priceVAT?: string;
  priceVATBusiness?: string;
}

export interface Product {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
    image: string
}

export interface ProductWithoutImage extends Omit<Product, 'image'> {}

export interface ProductToDashboard extends ProductWithoutImage {
    readonly _id: string;
}

export interface DetailParams {
    id: string;
    [key: string]: string | undefined;
  }

export interface RootState {
    detail: Product;
}
