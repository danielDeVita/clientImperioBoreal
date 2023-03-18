import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

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
            <Link to={`/${id}`}>
                <a href="/">
                    <h2>Nombre:</h2>
                    <p>{descriptionName}</p>
                </a>
                <div className={style.cardImage}>
                    <img src={img} alt={descriptionName} />
                </div>
                <div className={style.cardContent}>
                    <h3>Categoria:</h3>
                    <p>{category}</p>
                    <h4>Precio:</h4>
                    <p>${price} ARS</p>
                    {/* Esto es para info nuestra mientras esta en development */}
                    <h5>Id del producto: {id}</h5>
                </div>
            </Link>
        </div>
    );
}

export default Card;