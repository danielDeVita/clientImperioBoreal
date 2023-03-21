import React from "react";
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

const Card: React.FC<CardProp> = ({
  descriptionName,
  category,
  price,
  priceBusiness,
  priceVAT,
  priceVATBusiness,
  id,
  img,
}) => {
  return (
    <div className={style.card}>
      <h1>{descriptionName}</h1>
      <div className={style.cardImage}>
        <Link to={`/${id}`}>
          <img
            src={
              img
                ? img
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
        <h2>${price} ARS</h2>
      </div>
    </div>
  );
};

export default Card;
