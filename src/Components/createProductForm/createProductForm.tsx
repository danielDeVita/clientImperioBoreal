import React, { useState, useEffect } from 'react';
import { validate } from './Validate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import formInput from '../formInput/formInput';

const createProductForm = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        descriptionName: "",
        category: "",
        price: 0,
        priceBusiness: 0,
        priceVAT: 0,
        priceVATBusiness: 0,
    });

    const [errors, setErrors] = useState({
        descriptionName: "",
        category: "",
        price: "",
        priceBusiness: "",
        priceVAT: "",
        priceVATBusiness: "",
    });

    const handleInputChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

        setErrors(
            validate({
                ...product,
                [e.target.name]: e.target.value
            })
        );
    };

    const inputs = [
        {
            name: "descriptionName",
            type: "text",
            placeholder: "Ingrese el nombre de producto",
            label: "descriptionName",
        },
        {
            name: "category",
            type: "text",
            placeholder: "Ingrese la categoría de producto",
            label: "category",
        },
        {
            name: "price",
            type: "number",
            placeholder: "Ingrese el precio del producto",
            label: "number",
        },
        {
            name: "priceBusiness",
            type: "number",
            placeholder: "Ingrese el precio mayorista del producto",
            label: "number",
        },
        {
            name: "priceVAT",
            type: "number",
            placeholder: "Ingrese el precio con IVA del producto",
            label: "number",
        },
        {
            name: "priceVATBusiness",
            type: "number",
            placeholder: "Ingrese el precio mayorista con IVA del producto",
            label: "number",
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (Object.keys(errors).length === 0) {
                await axios.post('http://localhost:3001/products/', product);
                alert("Producto creado");
                navigate("/")
            } else {
                alert("Faltan completar campos")
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Ingrese su producto</h1>

            {inputs.map((input, i) => {
                return (
                    <formInput
                        key={i}
                        value={product[input.name]}
                        onChange={handleInputChange}
                    />
                )
            })}

            <button>Crear producto</button>

        </form>
    )

}



export default createProductForm;