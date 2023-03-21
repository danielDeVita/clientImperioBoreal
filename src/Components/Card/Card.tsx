import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import noImage from "../../assets/no-image.png";
import agendas from "../../assets/agendas.jpg";
import articulosDeOficina from "../../assets/articulos-de-oficina.jpg";
import escolares from "../../assets/escolares.jpg";
import lapiceras from "../../assets/lapiceras.jpg";
import lapices from "../../assets/lapices.jpg";
import resmas from "../../assets/resmas.jpg";
import { CardProp } from "../../props.d";
import addToCart from '../../assets/add-to-cart.png'
import checkOut from '../../assets/check-out.png'
import { KEY_LOCAL_STORAGE } from "../../types.d";
import useLocalStorage from "../../hooks/useLocalStorage";

const Card: React.FC<CardProp> = ({
  descriptionName,
  category,
  price,
  priceBusiness,
  priceVAT,
  priceVATBusiness,
  id,
  image,
}) => {
  const { setItmes, deleteItems, validateProducst } = useLocalStorage(KEY_LOCAL_STORAGE.KEY)
  const [added, setAdded] = useState<boolean>(validateProducst(id))
  const handlerAddProduct = () => {
    if (added) {
       deleteItems(id)
    } else {
      setItmes({
        descriptionName,
        category,
        price,
        id,
        image,
        priceBusiness,
        priceVAT,
        priceVATBusiness
      })
    }
    setAdded(prevValue => !prevValue)
  }
  return (
    <div className={style.card}>
      <h1>{descriptionName}</h1>
      <div className={style.cardImage}>
        <Link to={`/products/${id}`}>
          <img
            src={
              image?.secure_url
                ? image?.secure_url
                : category === "lapiz"
                  ? lapices
                  : category === "resmas"
                    ? resmas
                    : category === "agenda"
                      ? agendas
                      : category === "oficina"
                        ? articulosDeOficina
                        : category === "lapicera"
                          ? lapiceras
                          : category === "escolar"
                            ? escolares
                            : noImage
            }
            alt={descriptionName}
          />
        </Link>
      </div>
      <div className={style.cardContent}>
        <h5>Categoria: {category}</h5>
        <div>  
          <h2>${price} ARS</h2>
            <button className={style.button} onClick={handlerAddProduct}>
              <img src={ added ? checkOut : addToCart} alt='Call to action'/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
