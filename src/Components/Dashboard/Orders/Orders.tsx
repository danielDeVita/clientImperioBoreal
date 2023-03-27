import { State } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getAllOrders } from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders())
    }, []);

    const orders = useSelector((state: State) => state.orders)

    const handleDelete = async (id: string) => {
        try {
            dispatch(getAllOrders());
            const deleteProduct = await axios.delete(`/orders/${id}`);
        } catch (error) {
            console.error(error)
        }
    };

    const [status, setStatus] = useState("")

    const handleChange = (e: any) => {
        setStatus(e.target.value)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        try {
            e.preventDefault();
            await axios.put(`/orders/${id}`, { status });
            dispatch(getAllOrders())
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            {orders.map(order => {
                return (
                    <div>
                        <h2>Número de orden: {order.orderId}</h2>
                        <h2>Usuario: {order.user.email}</h2>
                        <h3>Id de usuario: {order.user._id}</h3>
                        <p>Estatus de compra: {order.status}</p>
                        <div>{order.cart.products.map((product: any) => {
                            return (
                                <>
                                    <h2>{product.descriptionName}</h2>
                                    <img src={product.image} />
                                    <h3>Precio: {product.price}</h3>
                                    <h3>Cantidad: {product.quantity}</h3>
                                </>
                            )
                        })}
                            <p>Total: {order.cart.totalAmount}</p>
                        </div>
                        <button onClick={() => { handleDelete(order.orderId) }}>Eliminar</button>

                        <form onSubmit={(e) => { handleSubmit(e, order.orderId) }}>
                            <select name="status" onChange={handleChange}>
                                <option value="InProcess">InProcess</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Paid">Paid</option>
                            </select>
                            <button type="submit">Modificar</button>
                        </form>
                        <hr />
                        <hr />
                    </div>
                )
            })}
        </>
    )
}

export default Orders