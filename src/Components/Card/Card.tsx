import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';
import noImage from '../../assets/no-image.png'

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

const Card: React.FC<CardProp> = ({ descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness, id, img }) => {
    return (
        <div className={style.card}>
            
                <h1>Nombre:</h1>
                <p>{descriptionName}</p>
                <div className={style.cardImage}>
                <Link to={`/${id}`}><img src={!img ? noImage : img} alt={descriptionName} /></Link>
                </div>
                <div className={style.cardContent}>
                    <h3>Categoria:</h3>
                    <p>{category}</p>
                    <h4>Precio:</h4>
                    <p>${price} ARS</p>
                    {/* Esto es para info nuestra mientras esta en development */}
                    <h5>Id del producto: {id}</h5>
                </div>
        </div>
    );
}

export default Card;