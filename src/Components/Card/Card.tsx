import React from 'react';
import { Link } from 'react-router-dom';


interface CardProp {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
    id: string;
    img: string;
}

const Card : React.FC<CardProp> = ({descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness, id, img }) => {
    
    
    return (
        <div>
            {/*Aca va un link al detalle del producto*/ }
           <h2> Nombre: {descriptionName} </h2>
           
           <img src={img} alt={descriptionName} />
           <h3>Categoria: {category}</h3>
           <h4>Precio: ${price} ARS</h4>
           {/*esto es para info nuestra mientras esta en development */}
           <h5>id del producto: {id}</h5>
        </div>
    )
}

export default Card;