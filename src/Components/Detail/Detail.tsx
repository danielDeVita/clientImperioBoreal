import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail, getReviewsByProduct, resetDetail } from "../../Redux/actions";
import style from "./Detail.module.css";
import noImage from "../../assets/no-image.png";
import { AppDispatch } from "../../Redux/store";
import Footer from "../Footer/Footer";
import { DetailParams, State } from "../../types.d";
import addToCart from "../../assets/add-to-cart.png";
import checkOut from "../../assets/check-out.png";
import { KEY_LOCAL_STORAGE, Product } from "../../types.d";
import useLocalStorage from "../../hooks/useLocalStorage";
import Swal from "sweetalert2";
import Reviews from "../Reviews/Reviews";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "auth0";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const stars: any = {
  1: '⭐ ☆ ☆ ☆ ☆',
  2: '⭐⭐ ☆ ☆ ☆',
  3: '⭐⭐⭐ ☆ ☆',
  4: '⭐⭐⭐⭐ ☆',
  5: '⭐⭐⭐⭐⭐'
}

const Detail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0<User>();
  const { id } = useParams<DetailParams>();
  const { descriptionName, category, price, image, stock, _id } = useSelector(
    (state: State) => state.detail
  );
  const { setItmes, deleteItems, validateProducst } = useLocalStorage(
    KEY_LOCAL_STORAGE.KEY
  );

  const productReviews = useSelector((state: State) => state.productReviews)

  useEffect(() => {

    if (id) {
      dispatch(getDetail(id));
      dispatch(getReviewsByProduct(id))
      return () => {
        dispatch(resetDetail())
      }
    }
  }, [id]);
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState<boolean>(validateProducst(id as string));
  const handlerAddProduct = () => {
    if (added) {
      deleteItems(id as string);
    } else {
      Swal.fire({
        returnFocus: false,
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 550,
        backdrop: false,
      })
      setItmes({
        descriptionName,
        category,
        price,
        _id,
        image,
        quantity
      });
    }
    setAdded((prevValue) => !prevValue);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > (stock || 40)) {
      setQuantity((stock || 40))
    } else setQuantity(parseInt(e.target.value))
  }

  const handleDelete = async (id: any) => {
    try {
      Swal.fire({
        title: "Seguro que quieres eliminar el comentario?",
        text: "No se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0fb1bd",
        confirmButtonText: "Eliminar",
        iconColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteReview = await axios.delete(`/reviews/${id}`);
          navigate(0)
          Swal.fire(
            "Eliminado con éxito",
            "El comentario ha sido eliminado",
            "success"
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={style.logoContainer}>
        <Link to='/'>
          <img
            alt='logo'
            className={style.logoStyle}
            src='data:image/png;base64,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'
          />
        </Link>
      </div>
      <div className={style.card}>
        <div className={style.imageContainer}>

          {/* { */}
            {/* image?.secure_url ? */}
            <img
            src={image?.secure_url ? image?.secure_url : noImage }
            alt={descriptionName}
            className={style.image}
          /> 
          {/* // : <span className="loader"></span> */}
          {/* } */}
          
        </div>
        <div className={style.content}>
          <h2 className={style.title}>{descriptionName}</h2>
          <p className={style.detail}>Categoría: {category?.categoryName}</p>
          <p className={style.detail}>Precio: ${price} ARS</p>
          <div className={style.pCantidad}>
            <p>Cantidad</p>
          </div>
          <div className={style.btnStock}>
            <input type='number' min='1' max={stock} value={quantity} onChange={handleQuantity} />
          </div>
          <button className={style.button} onClick={handlerAddProduct}>
            <img src={added ? checkOut : addToCart} alt='Call to action' />
          </button>
        </div>
      </div>
      <Link to={"/"}>
        <button className={style.Backbutton}>Volver</button>
      </Link>
      <div className={style.footerContainer}>
        <div></div>



        <div className={style.container}>
          { productReviews &&
            productReviews.map((review) => {
              return (
                <div className={style.reviewCard}>
                   <p>{review.userId.email}</p>
                    <div className={style.infoContainer}>
                         <p className={style.rating}>{stars[review.rating]}</p>
                         <p>{review.createdAt}</p>
                    </div>
                    <div className={style.commentSection}>
                      <p>{review.comment}</p>
                    </div>
                    {user?.email === import.meta.env.VITE_ADMIN_EMAIL 
                      ? (<button className={style.btnEliminar}
                        onClick={() => handleDelete(review._id)}>ELIMINAR
                        </button>
                      ) : null}
                  </div>
              )
            })
            
          }
        </div>


        <Reviews id={id as string}/>
        <Footer />
      </div>
    </>
  );
};

export default Detail;
