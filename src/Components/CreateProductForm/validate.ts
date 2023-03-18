

interface Product {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
  }

interface Errors {
    descriptionName?: string;
    category?: string;
    price?: string;
    priceBusiness?: string;
    priceVAT?: string;
    priceVATBusiness?: string;
  }
  


export const validate = (product: Product) => {
    // Validation logic here
    let error:Errors = {}
  
    if (!product.descriptionName) error.descriptionName = 'El producto necesita un nombre!';
    else if (/[^A-Za-z0-9 ]+/g.test(product.descriptionName)) 
    error.descriptionName = " Name cannot have special characters or tildes"; 
    if (!product.category) error.category= 'El producto necesita una categoría!'
    if (product.price < 0) error.price = 'El precio no puede ser negativo!'
    if (product.priceBusiness < 0) error.priceBusiness = 'El precio de venta a empresas no puede ser negativo'
    if (product.priceVAT < 0) error.priceVAT = 'El precio con IVA no puede ser negativo'
    if (product.priceVATBusiness < 0) error.priceVATBusiness= 'El precio para empresas con IVA no puede ser negativo'
  
  
    return error;
  };

