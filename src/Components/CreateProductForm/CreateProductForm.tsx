import React, { useState } from "react";
import axios from "axios";
import style from "./createProductForm.module.css";

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

const validateInputs = (product: Product, touched: any): Errors => {
  const errors: Errors = {};

  if (touched.descriptionName && !product.descriptionName)
    errors.descriptionName = "Por favor ingrese un nombre para el producto.";
  if (touched.category && !product.category)
    errors.category = "Por favor ingrese una categoría para el producto.";
  if (touched.price && product.price <= 0)
    errors.price = "El precio debe ser mayor a cero.";
  if (touched.priceBusiness && product.priceBusiness <= 0)
    errors.priceBusiness = "El precio de venta a empresas debe ser mayor a cero.";
  if (touched.priceVAT && product.priceVAT <= 0)
    errors.priceVAT = "El precio con IVA para consumidores finales debe ser mayor a cero.";
  if (touched.priceVATBusiness && product.priceVATBusiness <= 0)
    errors.priceVATBusiness = "El precio con IVA para empresas debe ser mayor a cero.";

  return errors;
};

const CreateProductForm: React.FC = () => {
  const [touched, setTouched] = useState({
    descriptionName: false,
    category: false,
    price: false,
    priceBusiness: false,
    priceVAT: false,
    priceVATBusiness: false,
  });

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
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
    setErrors(
      validateInputs(product, {
        ...touched,
        [e.target.name]: true,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (Object.keys(errors).length === 0) {
        await axios.post("http://localhost:3001/products", product);
        console.log(product);
        alert("Producto creado");
        setProduct({
          descriptionName: "",
          category: "",
          price: 0,
          priceBusiness: 0,
          priceVAT: 0,
          priceVATBusiness: 0,
        });
      } else {
        alert("Faltan completar campos");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <h1 className={style.formTitulo}>Ingrese su producto</h1>

      <label className={style.formLabel} htmlFor="descriptionName">
        Nombre:{" "}
      </label>
      <input
        className={style.formInput}
        value={product.descriptionName}
        onChange={handleInputChange}
        id="descriptionName"
        type="text"
        name="descriptionName"
      />
      {errors?.descriptionName && (
        <p style={{ color: "red" }}>{errors?.descriptionName}</p>
      )}
      {/*El descriptionName ERROR y category ERROR se renderizan mal, el resto anda bien.*/}
      <label className={style.formLabel} htmlFor="category">
        Categoría:{" "}
      </label>
      <input
        className={style.formInput}
        value={product.category}
        onChange={handleInputChange}
        id="category"
        type="text"
        name="category"
      />
      {errors?.category && <p style={{ color: "red" }}>{errors?.category}</p>}

      <label className={style.formLabel} htmlFor="price">
        Precio:{" "}
      </label>
      <input
        className={style.formInput}
        value={product.price}
        onChange={handleInputChange}
        id="price"
        type="number"
        name="price"
      />
      {errors?.price && product?.price !== 0 && (
        <p style={{ color: "red" }}>{errors.price}</p>
      )}

      <label className={style.formLabel} htmlFor="priceBusiness">
        Precio venta empresas:{" "}
      </label>
      <input
        className={style.formInput}
        value={product.priceBusiness}
        onChange={handleInputChange}
        id="priceBusiness"
        type="number"
        name="priceBusiness"
      />
      {errors?.priceBusiness && product?.priceBusiness !== 0 && (
        <p style={{ color: "red" }}>{errors.priceBusiness}</p>
      )}

      <label className={style.formLabel} htmlFor="priceVAT">
        Precio Consumidor Final C/IVA:{" "}
      </label>
      <input
        className={style.formInput}
        value={product.priceVAT}
        onChange={handleInputChange}
        id="priceBusiness"
        type="number"
        name="priceVAT"
      />
      {errors?.priceVAT && product?.priceVAT !== 0 && (
        <p style={{ color: "red" }}>{errors.priceVAT}</p>
      )}

      <label className={style.formLabel} htmlFor="priceVATBusiness">
        Precio Empresa C/IVA:{" "}
      </label>
      <input
        className={style.formInput}
        value={product.priceVATBusiness}
        onChange={handleInputChange}
        id="priceVATBusiness"
        type="number"
        name="priceVATBusiness"
      />
      {errors?.priceVATBusiness && product?.priceVATBusiness !== 0 && (
        <p style={{ color: "red" }}>{errors.priceVATBusiness}</p>
      )}

      <button className={style.formButton} type="submit">
        Crear producto
      </button>
    </form>
  );
};

export default CreateProductForm;
