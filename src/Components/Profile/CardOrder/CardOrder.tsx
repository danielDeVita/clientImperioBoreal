import React from "react";
import { UserOrder } from "../../../types";

const Card: React.FC<UserOrder> = ({ user, status, cart, orderId }) => {
  return (
    <div className="card">
      <p>Email de usuario: {user.email}</p>
      <p>Estado: {status}</p>
      <div className="product-list">
        {cart.products.map((product: any, index) => (
          <div key={index} className="product">
            <img src={product?.image} alt={product.descriptionName} />
            <h4>{product.descriptionName}</h4>
            <p>Precio: {product.price}</p>
            <p>Cantidad: {product.quantity}</p>
          </div>
        ))}
      </div>
      <p>Total: {cart.totalAmount} ARS</p>
    </div>
  );
};

export default Card;