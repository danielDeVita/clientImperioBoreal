import { State } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getAllOrders } from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Orders.module.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orders = useSelector((state: State) => state.orders);

  const handleDelete = async (id: string) => {
    try {
      dispatch(getAllOrders());
      const deleteProduct = await axios.delete(`/orders/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    try {
      e.preventDefault();
      await axios.put(`/orders/${id}`, { status });
      dispatch(getAllOrders());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        loginWithRedirect()
      ) : (
        <>
          <Link to='/dashboard'>
            <button>Volver</button>
          </Link>
          {orders.map((order) => {
            return (
              <div className={style.orderCard}>
                <div className={style.dataUser}>
                  <h5>Número de orden:</h5>
                  <p>{order.orderId}</p>
                  <h5>Usuario:</h5>
                  <p>{order.user.email}</p>
                  <h5>Id de usuario:</h5>
                  <p>{order.user._id}</p>
                  <h5>Estatus de compra: </h5>
                  <p>{order.status}</p>
                </div>
                {order.cart.products.map((product: any) => {
                  return (
                    <div className={style.productCard}>
                      <div className={style.pName}>
                        <h5>{product.descriptionName}</h5>
                        <img src={product.image} />
                      </div>
                      <div className={style.pContent}>
                        <p>Precio: {product.price}</p>
                        <p>Cantidad: {product.quantity}</p>
                      </div>
                    </div>
                  );
                })}
                <div className={style.pTotalAmount}>
                  <p>Total: {order.cart.totalAmount}</p>
                </div>

                <form
                  className={style.formOrder}
                  onSubmit={(e) => {
                    handleSubmit(e, order.orderId);
                  }}
                >
                  <select
                    className={style.selectStatus}
                    name='status'
                    onChange={handleChange}
                  >
                    <option value='InProcess'>InProcess</option>
                    <option value='Cancelled'>Cancelled</option>
                    <option value='Paid'>Paid</option>
                  </select>
                  <div>
                    <button className={style.btnModificar} type='submit'>
                      Modificar
                    </button>
                    <button
                      className={style.btnEliminar}
                      onClick={() => {
                        handleDelete(order.orderId);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </form>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Orders;
