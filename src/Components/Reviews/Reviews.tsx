import React, { useState, useContext, useEffect } from "react";
import style from "../Reviews/Reviews.module.css";
import axios from "axios";
import { CartContextType, State } from "../../types.d";
import { CartContext } from "../../context";
import { useSelector } from "react-redux";
import { validate } from "../CreateProductForm/validate";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

interface ReviewProps {
  id: string;
}

const Reviews: React.FC<ReviewProps> = ({ id }) => {

  const navigate = useNavigate();

  const validateInputs = (review: any) => {
    const errors: {
      rating: string;
    } = {
      rating: "",
    };

    if (!review.rating)
      errors.rating = "Por favor ingrese un rating para la reseña.";
    return errors;
  };

  const [review, setReview] = useState<any>({
    rating: 0,
    comment: "",
    productId: "",
    userId: "",
  });
  const [errors, setErrors] = useState({
    rating: "",
  });
  const reviews = useSelector((state: State) => state.productReviews);
  const { userId } = useContext(CartContext) as CartContextType;

  const handleInputChange = (e: any) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
      productId: id,
      userId,
    });
    setErrors(
      validateInputs({
        ...review,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes estar registrado para dejar un comentario!",
        });
        return;
      }
      if (review.rating !== 0) {
        const { data } = await axios.post("/reviews", review);
        /*  window.location.reload(); */
        navigate(0)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes seleccionar el rating del producto!",
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.h4}>
        <strong>Cantidad de comentarios: {reviews.length}</strong>
      </h2>
      <br />
      {!reviews.length && (
        <p>
          Este producto aún no tiene reseñas. ¡Sé el primero en compartirnos tu
          opinión!
        </p>
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label className={style.label}>Valoración de tu compra</label>
          <select
            onChange={handleInputChange}
            className={style.select}
            name='rating'
            defaultValue='default'
          >
            <option value='default' disabled>
              Puntue el producto!
            </option>
            <option value={1}>⭐ ☆ ☆ ☆ ☆</option>
            <option value={2}>⭐⭐ ☆ ☆ ☆</option>
            <option value={3}>⭐⭐⭐ ☆ ☆</option>
            <option value={4}>⭐⭐⭐⭐ ☆</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
          <p>{errors.rating}</p>
        </div>
        <textarea
          onChange={handleInputChange}
          className={style.textarea}
          rows={5}
          name='comment'
          placeholder='Escribe un comentario sobre tu compra'
        />
        <br />
        <div className={style.button__container}>
          <button type='submit' className={style.button__comment}>
            Comentar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reviews;
