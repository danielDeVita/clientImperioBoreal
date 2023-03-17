
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import  {Store}  from "redux";
// import { getDetail } from "../../Redux/actions"

// interface DetailProps {
//     descriptionName: string;
//     category: string;
//     price: number;
//     priceBusiness: number;
//     priceVAT: number;
//     priceVATBusiness: number;
//     _id?: string | number;
//     img: string;
// }

// const Detail: React.FC<DetailProps> = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams<{ id?: string }>();
//   const productDetail: DetailProps = useSelector(
//     (state: Store) => state.detail
//   );

//   useEffect(() => {
//     dispatch(getDetail(_id));
//   }, [dispatch, id]);

//   return (
//     <div>
//        <img src={productDetail.img} alt={productDetail.descriptionName} />
//       <h2>{productDetail.descriptionName}</h2>
//       <p>Categoría: {productDetail.category}</p>
//       <p>Precio: ${productDetail.price}</p>
//       <p>Precio mayorista: ${productDetail.priceBusiness}</p>
//       <p>Precio + IVA: ${productDetail.priceVAT}</p>
//       <p>Precio mayorista + IVA: ${productDetail.priceVATBusiness}</p>
//     </div>
//   );
// };

// export default Detail;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Store } from "redux";
import { getDetail } from "../../Redux/actions";

interface DetailProps {}

interface DetailParams {
  id: string;
}

interface DetailState {
  detail: {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
    id: string | number;
    img: string;
  };
}

const Detail: React.FC<DetailProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<DetailParams>();
  const productDetail = useSelector<Store<DetailState>, DetailState["detail"]>(
    (state) => state.detail
  );

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <img src={productDetail.img} alt={productDetail.descriptionName} />
      <h2>{productDetail.descriptionName}</h2>
      <p>Categoría: {productDetail.category}</p>
      <p>Precio: ${productDetail.price}</p>
      <p>Precio mayorista: ${productDetail.priceBusiness}</p>
      <p>Precio + IVA: ${productDetail.priceVAT}</p>
      <p>Precio mayorista + IVA: ${productDetail.priceVATBusiness}</p>
    </div>
  );
};

export default Detail;