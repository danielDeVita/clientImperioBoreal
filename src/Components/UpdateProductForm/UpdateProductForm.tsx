import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from './UpdateProductForm.module.css'
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';


interface Product {
  descriptionName: string;
  category: string;
  price: number;
  priceBusiness: number;
  priceVAT: number;
  priceVATBusiness: number;
}

interface Errors {
  descriptionName: string;
  category: string;
  price: string;
  priceBusiness: string;
  priceVAT: string;
  priceVATBusiness: string;
}

interface OldProduct {
  _id: string;
  descriptionName: string;
  category: string;
  price: number;
  priceBusiness: number;
  priceVAT: number;
  priceVATBusiness: number;
}

const validate = (product: Product) => {
  // Validation logic here
  return {};
};

const UpdateProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get<OldProduct>(`http://localhost:3001/products/${id}`)
      .then((response) => {
        const oldProduct = response.data;
        setProduct(oldProduct)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])


  const [product, setProduct] = useState<Product>({
    descriptionName: "",
    category: "",
    price: 0,
    priceBusiness: 0,
    priceVAT: 0,
    priceVATBusiness: 0,
  });

  const [errors, setErrors] = useState<Errors>({
    descriptionName: "",
    category: "",
    price: "",
    priceBusiness: "",
    priceVAT: "",
    priceVATBusiness: "",
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
      await axios.put(`http://localhost:3001/products/${id}`, product);
      console.log(product)
      alert("Producto modificado");
      navigate('/dashboard');
    } catch (error) {
      console.error(error)
    }
  };

  return (

    <div className={style.divFormContainer}>
      <form className={style.formContainer} onSubmit={handleSubmit}>

        <h1 className={style.formTitulo}>Modifique su producto</h1>

        <label className={style.formLabel} htmlFor="descriptionName">Nombre: </label>
        <input className={style.formInput} value={product.descriptionName} onChange={handleInputChange} id='descriptionName' type="text" name='descriptionName' />

        <label className={style.formLabel} htmlFor="category">Categoría: </label>
        <input className={style.formInput} value={product.category} onChange={handleInputChange} id='category' type="text" name='category' />

        <label className={style.formLabel} htmlFor="price">Precio: </label>
        <input className={style.formInput} value={product.price} onChange={handleInputChange} id='price' type="number" name='price' />

        <label className={style.formLabel} htmlFor="priceBusiness">Precio venta empresas: </label>
        <input className={style.formInput} value={product.priceBusiness} onChange={handleInputChange} id='priceBusiness' type="number" name='priceBusiness' />

        <label className={style.formLabel} htmlFor="priceVAT">Precio Consumidor Final C/IVA: </label>
        <input className={style.formInput} value={product.priceVAT} onChange={handleInputChange} id='priceBusiness' type="number" name='priceVAT' />

        <label className={style.formLabel} htmlFor="priceVATBusiness">Precio Empresa C/IVA: </label>
        <input className={style.formInput} value={product.priceVATBusiness} onChange={handleInputChange} id='priceVATBusiness' type="number" name='priceVATBusiness' />

        <button className={style.formButton} type='submit'>Modificar producto</button>

      </form>
    </div>
  )

}


export default UpdateProductForm;
