import React from "react";
import { useSelector } from "react-redux";
import { Product, ProductToStorage } from "../../types";
import { RootState } from "../../Redux/store";
import style from "../ShoppingCart/ShoppingCart.module.css"
import noImage from "../../assets/no-image.png";
import agendas from "../../assets/agendas.jpg";
import articulosDeOficina from "../../assets/articulos-de-oficina.jpg";
import escolares from "../../assets/escolares.jpg";
import lapiceras from "../../assets/lapiceras.jpg";
import lapices from "../../assets/lapices.jpg";
import resmas from "../../assets/resmas.jpg";
import { KEY_LOCAL_STORAGE } from "../../types.d";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";


const ShoppingCart: React.FC = () => {

  const { getLocalStorage } = useLocalStorage(
    KEY_LOCAL_STORAGE.KEY
  );
  //const products = useSelector((state: RootState) => state.products)

  const products = getLocalStorage()

  const cartToDB = async (products: ProductToStorage[]) => {
    const carrito = {
      user: "64121757bc70cbbe06154e6f", //este dato de donde se saca?
      products: products.map(product => product.id)
    }
    await axios.post("http://localhost:3001/carts", carrito);
  }

  return (

    <div className={style.Contenedor}>

      <table className={style.dashboardTable}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Cantidad: { }</th>
            <th>Tachito Icono</th>
            <th>Subtotal: { }</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: ProductToStorage) => (
            <tr className={style.trContainer} key={product.id}>
              <td>
                <img className={style.imagen} src={
                  product?.image
                    ? product?.image.secure_url
                    : product?.category === "lapiz"
                      ? lapices
                      : product?.category === "resmas"
                        ? resmas
                        : product?.category === "agenda"
                          ? agendas
                          : product?.category === "oficina"
                            ? articulosDeOficina
                            : product?.category === "lapicera"
                              ? lapiceras
                              : product?.category === "escolar"
                                ? escolares
                                : noImage
                } /></td>
              <td>{product?.descriptionName}</td>
              <td>{product?.category}</td>
              <td>{product?.price}</td>
              <td>{product?.descriptionName.length}</td>

              <td>
                <button>Eliminar</button>
              </td>
              <td>{product?.price}</td>
            </tr>
          ))}

        </tbody>

      </table>

      <div className={style.tablaComprar}>
        <h2>Total:</h2>
        <p>${products[0]?.price}</p>
        <button className={style.btnComprar} onClick={() => cartToDB(products)}>Comprar</button>
      </div>

    </div>
  )
}

export default ShoppingCart;