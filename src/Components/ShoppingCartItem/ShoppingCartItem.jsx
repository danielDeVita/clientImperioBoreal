import { useState } from "react"
import useLocalStorage from "../../hooks/useLocalStorage";
import { KEY_LOCAL_STORAGE } from "../../types.d";
import style from "./ShoppingCartItem.module.css";

const ShoppingCartItem = ({ descriptionName, category, price, id, image }) => {

    const [productQuantity, setProductQuantity] = useState(1)

    const handleQuantityChange = (e) => {
        setProductQuantity(e.target.value)
    };

    const { deleteItems } = useLocalStorage(KEY_LOCAL_STORAGE.KEY);

    return (
        <tr className={style.trContainer}>
            <td>
                <img className={style.imagen} src={image} />
            </td>
            <td>{descriptionName}</td>
            <td>{category}</td>
            <td>{price}</td>
            <td><input type="number" value={productQuantity} min="1" onChange={handleQuantityChange} name="quantity"></input>
            </td>
            <td>
                <button onClick={() => deleteItems(id)}>Eliminar</button>
            </td>
            <td>{productQuantity * price}</td>
        </tr>
    )
}

export default ShoppingCartItem