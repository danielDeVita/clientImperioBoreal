import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import styles from './Detail.module.css';
import noImage from '../../assets/no-image.png'
import { AppDispatch } from "../../Redux/store";

interface DetailParams {
  id: string;
  [key: string]: string | undefined;
}
interface RootState {
  detail: {
    descriptionName: string
    category: string
    price: number
    priceBusiness: number
    priceVAT: number
    priceVATBusiness: number
    img: string
  }
}
const Detail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<DetailParams>();
  const {descriptionName, category, price, priceBusiness, priceVAT, priceVATBusiness, img} = useSelector((state: RootState) => state.detail);

  useEffect(() => {
    if(id) {
      dispatch(getDetail(id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <img src={!img ? noImage : img} alt={descriptionName} className={styles.image} />
      <h2 className={styles.title}>{descriptionName}</h2>
      <p className={styles.detail}>Categoría: {category}</p>
      <p className={styles.detail}>Precio: {price}</p>
      <p className={styles.detail}>Precio mayorista: {priceBusiness}</p>
      <p className={styles.detail}>Precio + IVA: {priceVAT}</p>
      <p className={styles.detail}>Precio mayorista + IVA: {priceVATBusiness}</p>
    </div>
  )
}

export default Detail;