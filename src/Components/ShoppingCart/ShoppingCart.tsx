import React from "react";
import { useSelector } from "react-redux";
import { Product } from "../../types";
import { RootState } from "../../Redux/store";


const ShoppingCart: React.FC = () => {

    const products = useSelector((state: RootState) => state.products)

   
   
    return(
        <div>
        <table>
            <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>

            <th>Cantidad: {}</th>
            <th>Subtotal: {}</th>

          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.descriptionName}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.priceBusiness}</td>
              <td>{product.priceVAT}</td>
              <td>{product.priceVATBusiness}</td>
              <td>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
    )
}

export default ShoppingCart;