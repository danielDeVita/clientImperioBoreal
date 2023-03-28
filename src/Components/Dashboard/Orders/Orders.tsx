import { Product, State } from "../../../types.d";
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
import downArrow from '../../../assets/down-arrow.png'

interface OrderProps {
  cart: Product[]
  orderId: string;
  email: string;
  _id: string;
  status: string;
  totalAmount: number
}

const OrderItem: React.FC<OrderProps> = ({ orderId, email, _id, status, cart, totalAmount }) => {
  const dispatch: AppDispatch = useDispatch();

  const [toggle, setToggle] = useState(false)
  const [newStatus, setStatus] = useState("");

  const handleChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (
    id: string
  ) => {
    try {
      await axios.put(`/orders/${id}`, { status: newStatus });
      dispatch(getAllOrders());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
        Swal.fire({
            title: "Seguro que quieres eliminar la orden?",
            text: "No se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#0fb1bd",
            confirmButtonText: "Eliminar",
            iconColor: "red",
          }).then(async (result) => {
            if (result.isConfirmed) {
      dispatch(getAllOrders());
      const deleteProduct = await axios.delete(`/orders/${id}`);
      Swal.fire(
        "Eliminada con éxito",
        "La orden ha sido eliminada",
        "success"
      );
    }
  });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={ !toggle ? `${style.orderCard} ${style.setHeight}` : style.orderCard}>
    <button 
     className={style.toggle}
     onClick={() => setToggle(prev => !prev)}
     >
      <img src={downArrow} alt='Down arrow'/>
     </button>
    <div className={style.dataUser}>
      <span className={style.wrapperInfo}>
        <h5>Número de orden:</h5>
        <p>{orderId}</p>
      </span>
      <span className={style.wrapperInfo}>
        <h5>Usuario:</h5>
        <p>{email}</p>
      </span>
      <span className={style.wrapperInfo}>
        <h5>Id de usuario:</h5>
        <p>{ _id }</p>
      </span>
      <span className={style.wrapperInfo}>
        <h5>Estatus de compra: </h5>
        <p>{ status }</p>
      </span>
    </div>
    <div className={ !toggle ? `${style.productCartContainer} ${style.productHidden}`: style.productCartContainer}>
      {cart.map((product: any, index) => {
        return (
          <div key={index} className={style.productCard}>
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
      </div>
    <div className={style.pTotalAmount}>
      <p>Total: {totalAmount}</p>
    </div>

      <div className={style.btnContainer}>
        <select
          className={style.selectStatus}
          name='status'
          onChange={handleChange}
        >
          <option value='InProcess'>InProcess</option>
          <option value='Cancelled'>Cancelled</option>
          <option value='Paid'>Paid</option>
        </select>
          <button onClick={() => handleSubmit(orderId)} className={style.btnModificar} type='button'>
            Modificar
          </button>
          <button
            className={style.btnEliminar}
            onClick={() => {
              handleDelete(orderId);
            }}
          >
            Eliminar
          </button>
      </div>
  </div>
  )
}

const Orders: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orders = useSelector((state: State) => state.orders);


  return (
    <>
      {!isAuthenticated ? (
        loginWithRedirect()
      ) : (
        <>
          <Link to='/dashboard'>
            <button className={style.Backbutton}>Volver</button>
          </Link>
          <section className={style.CardContainer}>
          { orders.map((order) => (
            <OrderItem 
              email={order.user.email}
              _id={order.user._id}
              orderId={order.orderId}
              status={order.status}
              cart={order.cart.products}
              totalAmount={order.cart.totalAmount}
            />
          ))}
          </section>
        </>
      )}
    </>
  );
};

export default Orders;
