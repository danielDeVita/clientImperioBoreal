import React from "react";
import { UserOrder } from "../../../types";
import styles from './CardOrder.module.css'

  const Card: React.FC<UserOrder> = ({user, status, cart, orderId }) => {
    return (
        <div className={styles.card}>
          <p className={styles.email}>Email de usuario: {user.email}</p>
          <p className={styles.status}>Estado: {status}</p>
          <div className={styles.productList}>
            {cart.products.map((product: any, index) => (
              <div key={index} className={styles.product}>
                <img className={styles.productImage} src={product?.image} alt={product.descriptionName} />
                <h4 className={styles.productName}>{product?.descriptionName}</h4>
                <p className={styles.productPrice}>Precio: {product?.price}</p>
                <p className={styles.productQuantity}>Cantidad: {product?.quantity}</p>
              </div>
            ))}
          </div>
          <p className={styles.total}>Total: {cart.totalAmount} ARS</p>
        </div>
      );
  };
  
  export default Card;