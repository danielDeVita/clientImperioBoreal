import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import noImage from "../../assets/no-image.png";
import addToCart from "../../assets/add-to-cart.png";
import checkOut from "../../assets/check-out.png";
import { KEY_LOCAL_STORAGE, Product } from "../../types.d";
import useLocalStorage from "../../hooks/useLocalStorage";

const Card: React.FC<Product> = ({
  descriptionName,
  category,
  price,
  _id,
  image,
}) => {
  const { setItmes, deleteItems, validateProducst } = useLocalStorage(
    KEY_LOCAL_STORAGE.KEY
  );
  const [added, setAdded] = useState<boolean>(validateProducst(_id as string));
  const handlerAddProduct = () => {
    if (added) {
      deleteItems(_id as string);
    } else {
      setItmes({
        descriptionName,
        category,
        price,
        _id,
        image,
      });
    }
    setAdded((prevValue) => !prevValue);
  };
  return (
    <div className={style.card}>
      <h1>{descriptionName}</h1>
      <div className={style.cardImage}>
        <Link to={`/products/${_id}`}>
          <img
            src={image.secure_url ? image.secure_url : noImage}
            alt={descriptionName}
          />
        </Link>
      </div>
      <div className={style.cardContent}>
        <h5>Categoria: {category.categoryName}</h5>
        <div>
          <h2>${price} ARS</h2>
          <button className={style.button} onClick={handlerAddProduct}>
            <img src={added ? checkOut : addToCart} alt='Call to action' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
