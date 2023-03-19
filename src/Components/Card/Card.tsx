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
            
                <h1>{descriptionName}</h1>
                <div className={style.cardImage}>
                <Link to={`/${id}`}><img src={!img ? noImage : img} alt={descriptionName} /></Link>
                </div>
                <div className={style.cardContent}>
                    <h5>Categoria: {category}</h5>
                    <h2>${price} ARS</h2>
                    {/* Esto es para info nuestra mientras esta en development */}
                    <h5>Id:{id}</h5>
                </div>
        </div>
    );
}

export default Card;