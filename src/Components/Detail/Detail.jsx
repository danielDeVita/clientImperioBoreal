import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <img src={productDetail.img} alt={productDetail.descriptionName} />
      <h2>{productDetail.descriptionName}</h2>
      <p>Categoría: {productDetail.category}</p>
      <p>Precio: {productDetail.price}</p>
      <p>Precio mayorista: {productDetail.priceBusiness}</p>
      <p>Precio + IVA: {productDetail.priceVAT}</p>
      <p>Precio mayorista + IVA: {productDetail.priceVATBusiness}</p>
    </div>
  )
}

export default Detail;