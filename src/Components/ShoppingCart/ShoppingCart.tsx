import React from "react";
import { useSelector } from "react-redux";
import { Product } from "../../types";
import { RootState } from "../../Redux/store";
import style from "../ShoppingCart/ShoppingCart.module.css"


const ShoppingCart: React.FC = () => {

  const products = useSelector((state: RootState) => state.products)
   
  return(
    <div className={style.Contenedor}>
      <table className={style.dashboardTable}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Cantidad: {}</th>
            <th>Tachito Icono</th>
            <th>Subtotal: {}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className={style.trContainer}>
              <td><img src={product.image?.secure_url} /></td>
              <td>{product.descriptionName}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.descriptionName.length}</td>
              
              <td>
                <button>Eliminar</button>
              </td>
              <td>{product.price}</td>
            </tr>
          ))}

        </tbody>

      </table>
     
      <div className={style.tablaComprar}>
        <h2>Total:</h2>
        <p>${products[0].price}</p>
        <button className={style.btnComprar}>Comprar</button>
      </div>
      
    </div>
    )
}

export default ShoppingCart;