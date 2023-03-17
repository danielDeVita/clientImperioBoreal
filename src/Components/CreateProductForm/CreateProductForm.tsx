



// export const validate = (product: Errors) => {
//   // Validation logic here
//   let error:Errors = {}

//   if (!product.descriptionName) error.descriptionName = 'El producto necesita un nombre!';
//   else if (/[^A-Za-z0-9 ]+/g.test(product.descriptionName)) 
//   error.descriptionName = " Name cannot have special characters or tildes"; 
//   if (!product.category) error.category= 'El producto necesita una categoría!'
//   if (product.price < 0) error.price = 'El precio no puede ser negativo!'
//   if (product.priceBusiness < 0) error.priceBusiness = 'El precio de venta a empresas no puede ser negativo'
//   if (product.priceVAT < 0) error.priceVAT = 'El precio con IVA no puede ser negativo'
//   if (product.priceVATBusiness < 0) error.priceVATBusiness= 'El precio para empresas con IVA no puede ser negativo'


//   return error;
// };

import React, { useState } from "react";
import axios from 'axios';
import style from './createProductForm.module.css'
import { validate } from "./validate";



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



const validateInputs = (product: Product): Errors => {
  const errors: Errors = {};

  if (!product.descriptionName) {
    errors.descriptionName = "Por favor ingrese un nombre para el producto.";
  }

  if (!product.category) {
    errors.category = "Por favor ingrese una categoría para el producto.";
  }

  if (product.price <= 0) {
    errors.price = "El precio debe ser mayor a cero.";
  }

  if (product.priceBusiness <= 0) {
    errors.priceBusiness = "El precio de venta a empresas debe ser mayor a cero.";
  }

  if (product.priceVAT <= 0) {
    errors.priceVAT = "El precio con IVA para consumidores finales debe ser mayor a cero.";
  }

  if (product.priceVATBusiness <= 0) {
    errors.priceVATBusiness = "El precio con IVA para empresas debe ser mayor a cero.";
  }

  return errors;
};

const CreateProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    descriptionName: "",
    category: "",
    price: 0,
    priceBusiness: 0,
    priceVAT: 0,
    priceVATBusiness: 0,
  });
  
  const [errors, setErrors] = useState<Errors>({
    // descriptionName: "",
    // category: "",
    // price: "",
    // priceBusiness: "",
    // priceVAT: "",
    // priceVATBusiness: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
       
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
  
    if (Object.keys(errors).length === 0) {
        await axios.post('http://localhost:3001/products', product);
        console.log(product)
        alert("Producto creado");
        setProduct({
          descriptionName: "",
          category: "",
          price: 0,
          priceBusiness: 0,
          priceVAT: 0,
          priceVATBusiness: 0,
        })
        } else {
        alert("Faltan completar campos")
      }
    } catch (error) {
      console.error(error)
    }
  };

    return (
        <form className={style.formContainer} onSubmit={handleSubmit}>

            <h1 className={style.formTitulo}>Ingrese su producto</h1>

            <label className={style.formLabel} htmlFor="descriptionName">Nombre: </label>
            <input className={style.formInput} value={product.descriptionName} onChange={handleInputChange} id='descriptionName' type="text" name='descriptionName'/>
            {(errors?.descriptionName && product?.descriptionName !== '') && <p style ={{color: 'red'}}>{errors.descriptionName}</p>}


            <label className={style.formLabel} htmlFor="category">Categoría: </label>
            <input className={style.formInput} value={product.category} onChange={handleInputChange} id='category' type="text" name='category' />
            {(errors?.category && product?.category !== '') && <p style ={{color: 'red'}}>{errors.category}</p>}

            <label className={style.formLabel} htmlFor="price">Precio: </label>
            <input className={style.formInput} value={product.price} onChange={handleInputChange} id='price' type="number" name='price'/>
            {(errors?.price && product?.price !== 0) && <p style ={{color: 'red'}}>{errors.price}</p>}

            <label className={style.formLabel} htmlFor="priceBusiness">Precio venta empresas: </label>
            <input className={style.formInput} value={product.priceBusiness} onChange={handleInputChange} id='priceBusiness' type="number" name='priceBusiness'/>
            {(errors?.priceBusiness && product?.priceBusiness !== 0) && <p style ={{color: 'red'}}>{errors.priceBusiness}</p>}

            <label className={style.formLabel} htmlFor="priceVAT">Precio Consumidor Final C/IVA: </label>
            <input className={style.formInput} value={product.priceVAT} onChange={handleInputChange} id='priceBusiness' type="number" name='priceVAT' />
            {(errors?.priceVAT && product?.priceVAT !== 0) && <p style ={{color: 'red'}}>{errors.priceVAT}</p>}  

            <label className={style.formLabel} htmlFor="priceVATBusiness">Precio Empresa C/IVA: </label>
            <input className={style.formInput} value={product.priceVATBusiness} onChange={handleInputChange} id='priceVATBusiness' type="number" name='priceVATBusiness' />
            {(errors?.priceVATBusiness && product?.priceVATBusiness !== 0) && <p style ={{color: 'red'}}>{errors.priceVATBusiness}</p>}

        
            <button  className={style.formButton} type='submit'>Crear producto</button>

        </form>

    )

}


export default CreateProductForm;
