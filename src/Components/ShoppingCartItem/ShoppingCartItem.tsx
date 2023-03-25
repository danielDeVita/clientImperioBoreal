import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { KEY_LOCAL_STORAGE, Product } from "../../types.d";
import style from "./ShoppingCartItem.module.css";

const ShoppingCartItem: React.FC <Omit <Product, 'stock'>> = ({
  descriptionName,
  category,
  price,
  _id,
  image,
  quantity
}) => {
  const [productQuantity, setProductQuantity] = useState(quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof parseInt(e.target.value) === "number") {
      updateQuantity(_id as string, parseInt(e.target.value))
      setProductQuantity(parseInt(e.target.value));
    }
  };

  const { deleteItems, updateQuantity } = useLocalStorage(KEY_LOCAL_STORAGE.KEY);

  return (
    <tr className={style.trContainer}>
      <td>
        <img className={style.imagen} src={image?.secure_url} />
      </td>
      <td>{descriptionName}</td>
      <td>{category?.categoryName}</td>
      <td>{price}</td>
      <td>
        <input
          type='number'
          value={productQuantity}
          min='1'
          onChange={handleQuantityChange}
          name='quantity'
        ></input>
      </td>
      <td>
        <button onClick={() => deleteItems(_id as string)}>Eliminar</button>
      </td>
      <td>{(productQuantity || 1) * price}</td>
    </tr>
  );
};

export default ShoppingCartItem;
