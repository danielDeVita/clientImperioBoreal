import React, { useEffect, useState } from "react";
import { ProductToStorage } from "../../types";
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
import { useAuth0 } from "@auth0/auth0-react";

const ShoppingCart: React.FC = () => {

  const [user_id, setUser_id] = useState("");

  const { user } = useAuth0();

  const getUser_id = async () => {
    const response = await axios.get(`http://localhost:3001/users/${user?.email}`)
    const user_id = response.data._id
    setUser_id(user_id)
  }

  useEffect(() => {
    getUser_id()
  }, [user])

  const { getLocalStorage } = useLocalStorage(
    KEY_LOCAL_STORAGE.KEY
  );

  const products = getLocalStorage()

  const cartToDB = async (products: ProductToStorage[], user_id: string) => {
    const carrito = {
      user: user_id,
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
        <button className={style.btnComprar} onClick={() => cartToDB(products, user_id)}>Comprar</button>
      </div>

    </div>
  )
}

export default ShoppingCart;