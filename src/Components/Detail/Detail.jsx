import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import styles from './Detail.module.css';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <img src={productDetail.img} alt={productDetail.descriptionName} className={styles.image} />
      <h2 className={styles.title}>{productDetail.descriptionName}</h2>
      <p className={styles.detail}>Categoría: {productDetail.category}</p>
      <p className={styles.detail}>Precio: {productDetail.price}</p>
      <p className={styles.detail}>Precio mayorista: {productDetail.priceBusiness}</p>
      <p className={styles.detail}>Precio + IVA: {productDetail.priceVAT}</p>
      <p className={styles.detail}>Precio mayorista + IVA: {productDetail.priceVATBusiness}</p>
    </div>
  )
}

export default Detail;