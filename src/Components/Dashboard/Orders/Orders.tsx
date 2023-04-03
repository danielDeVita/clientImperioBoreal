import { Product, State } from "../../../types.d";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getAllOrders } from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import style from "./Orders.module.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import downArrow from "../../../assets/down-arrow.png";
import Pagination from "../../Pagination/Pagination";
import stylePag from "../../Pagination/Pagination.module.css";
import { CartContextType } from "../../../types.d";
import { CartContext } from "../../../context/index";

interface OrderProps {
  cart: Product[];
  orderId: string;
  email: string;
  _id: string;
  status: string;
  totalAmount: number;
}

const OrderItem: React.FC<OrderProps> = ({
  orderId,
  email,
  _id,
  status,
  cart,
  totalAmount,
}) => {

  const dispatch: AppDispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [newStatus, setStatus] = useState("");

  const handleChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (id: string) => {
    try {
      await axios.put(`/orders/${id}`, { putStatus: newStatus });
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
    <div
      className={
        !toggle ? `${style.orderCard} ${style.setHeight}` : style.orderCard
      }
    >
      <button
        className={style.toggle}
        onClick={() => setToggle((prev) => !prev)}
      >
        <img src={downArrow} alt='Down arrow' />
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
          <p>{_id}</p>
        </span>
        <span className={style.wrapperInfo}>
          <h5>Estatus de compra: </h5>
          <p>{status}</p>
        </span>
      </div>
      <div
        className={
          !toggle
            ? `${style.productCartContainer} ${style.productHidden}`
            : style.productCartContainer
        }
      >
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
        <button
          onClick={() => handleSubmit(orderId)}
          className={style.btnModificar}
          type='button'
        >
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
  );
};

const Orders: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const navigate = useNavigate()

  const { totalCart, user: loggedUser, setUser } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orders = useSelector((state: State) => state.orders);
  // ================ Pagination =============================================
  const [currentItems, setCurrentItems] = useState<Array<any>>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  const [pageNumberLimit, setPageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    setCurrentPage(Number(event.currentTarget.id));
  };
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(orders?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirsttItem = indexOfLastItem - itemsPerPage;

  const renderPageNumbers = pages.map((number) => {
    const isActive = currentPage === number;
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={String(number)}
          onClick={handleClick}
          className={`${stylePag.number} ${isActive ? stylePag.active : undefined
            }`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = (): void => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = (): void => {
    setCurrentPage(currentPage - 1);

    if (
      (currentPage - 1) % pageNumberLimit === 0 &&
      maxPageNumberLimit > pageNumberLimit
    ) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className={stylePag.hellipBtn} onClick={handleNextbtn}>
        &hellip;
      </li>
    );
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className={stylePag.hellipBtn} onClick={handlePrevbtn}>
        &hellip;
      </li>
    );
  }
  useEffect(() => {
    setCurrentItems(orders?.slice(indexOfFirsttItem, indexOfLastItem));
  }, [orders, indexOfFirsttItem, indexOfLastItem]);
  return (
    <>
      {!loggedUser ? (
        navigate("/")
      ) : (
        <>
          <Link to='/dashboard'>
            <button className={style.Backbutton}>Volver</button>
          </Link>
          <Pagination
            handleNextbtn={handleNextbtn}
            handlePrevbtn={handlePrevbtn}
            currentPage={currentPage}
            pages={pages}
            pageDecrementBtn={pageDecrementBtn}
            pageIncrementBtn={pageIncrementBtn}
            renderPageNumbers={renderPageNumbers}
          />
          <section className={style.CardContainer}>
            {currentItems?.map((order) => (
              <OrderItem
                key={order._id}
                email={order.user.email}
                _id={order.user._id}
                orderId={order.orderId}
                status={order.status}
                cart={order.cart.products}
                totalAmount={order.cart.totalAmount}
              />
            ))}
          </section>
          <Pagination
            handleNextbtn={handleNextbtn}
            handlePrevbtn={handlePrevbtn}
            currentPage={currentPage}
            pages={pages}
            pageDecrementBtn={pageDecrementBtn}
            pageIncrementBtn={pageIncrementBtn}
            renderPageNumbers={renderPageNumbers}
          />
        </>
      )}
    </>
  );
};

export default Orders;
