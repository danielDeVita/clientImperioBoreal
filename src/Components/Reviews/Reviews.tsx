import React, {useState, useContext} from "react";
import style from "../Reviews/Reviews.module.css"
import axios from "axios";
import { CartContextType, State } from "../../types.d";
import { CartContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { getReviewsByProduct } from "../../Redux/actions";


interface ReviewProps {
  id: string
}

const Reviews: React.FC<ReviewProps> = ({id}) => {

  const dispatch:AppDispatch = useDispatch();
  const [review, setReview] = useState<any>({
    rating: 0,
    comment: "",
    productId: "",
    userId: ""
  })
  const [errors, setErrors] = useState({
  })
  const reviews = useSelector((state:State) => state.productReviews)
  const { userId } = useContext(CartContext) as CartContextType;

  const handleInputChange = (e: any) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
      productId: id,
      userId
    })

  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data} =  await axios.post('/reviews', review)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.container}>
      <h2 className={style.h4}><strong>Cantidad de comentarios:</strong></h2>
      <br /> 
     {!reviews.length && <p>Este producto aún no tiene reseñas. ¡Sé el primero en compartirnos tu opinión!</p>} 
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label className={style.label}>Valoración de tu compra</label>
          <select onChange={handleInputChange} className={style.select} name="rating" defaultValue='default'>
            <option value="default" disabled>Puntue el producto!</option>
            <option value={1}>⭐ ☆ ☆ ☆ ☆</option>
            <option value={2}>⭐⭐ ☆ ☆ ☆</option>
            <option value={3}>⭐⭐⭐ ☆ ☆</option>
            <option value={4}>⭐⭐⭐⭐ ☆</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <textarea onChange={handleInputChange} className={style.textarea}
          rows={5}
          name="comment"
          placeholder="Escribe un comentario sobre tu compra"
        />
        <br />
        <button type="submit">Comentar</button>
      </form>
    </div>
  );
}

export default Reviews;
