import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import style from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Product, State, CartContextType, User } from "../../types.d";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { getCategories, getProducts } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import UserIcon from "../../assets/user.png";
import OrdersIcon from "../../assets/clipboard.png";
import Pagination from "../Pagination/Pagination";
import stylePag from "../Pagination/Pagination.module.css";
import { CartContext } from "../../context/index";
import DashboardSearch from "./DashboardSearch/DashboardSearch";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const navigate = useNavigate()

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  // 
  
  const { user: loggedUser, setUser } = useContext(CartContext) as CartContextType
  
  const dashboardProducts = useSelector((state: State) => state.dashboardProducts);
  
  // ================ Pagination =============================================
  const [currentItems, setCurrentItems] = useState<Array<any>>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  
  const [pageNumberLimit, setPageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    setCurrentPage(Number(event.currentTarget.id));
  };
  const pages: number[] = [];

  for (let i = 0; i < Math.ceil(dashboardProducts?.length / itemsPerPage); i++) {
    pages.push(i + 1);
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
    setCurrentItems(dashboardProducts?.slice(indexOfFirsttItem, indexOfLastItem));
  }, [dashboardProducts, indexOfFirsttItem, indexOfLastItem]);


  const handleDelete = async (_id: string, categoryId: string) => {
    try {
      Swal.fire({
        title: "Seguro que quieres eliminar el producto?",
        text: "No se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0fb1bd",
        confirmButtonText: "Eliminar",
        iconColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteProduct = await axios.delete(
            `/products/${_id}?categoryId=${categoryId}`
          );
          dispatch(getProducts());
          dispatch(getCategories());
          Swal.fire(
            "Eliminado con éxito",
            "Tu producto ha sido eliminado",
            "success"
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (!currentItems) {
    return <div>No hay productos para mostrar</div>;
  }
  return (
    <>
      {!loggedUser ? (
        navigate("/")
      ) : (
        <>
          <div className={style.logoContainer}>
            <Link to='/'>
              <img
                alt='logo'
                className={style.logoStyle}
                src='data:image/png;base64,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'
              />
            </Link>
            <div className={style.linksContainer}>
              <Link to='/dashboard/orders'>
                <img src={OrdersIcon} alt='Link a ordenes' />
              </Link>
              {
                user?.email === import.meta.env.VITE_ADMIN_EMAIL ?
              <Link to='/dashboard/users' className={style.userIcon}>
                <img src={UserIcon} alt='Link a usuarios' />
              </Link>
              : null

              }
            </div>
          </div>
          <Link to='/'>
            <p className={style.backBtn}>
              <i className='fa-solid fa-arrow-left'></i>
            </p>
          </Link>
          <Link to='/productForm'>
            <button className={style.crearProductoBtn}>+</button>
          </Link>
          <DashboardSearch setCurrentPage={setCurrentPage}/>
          <table className={style.dashboardTable}>
            <thead>

              <tr>
                <th>Imagen</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product: Product) => (
                <tr key={product._id}>
                  <th>
                    <img
                      src={product.image?.secure_url}
                      alt={product.descriptionName}
                      className={style.imageTable}
                    />
                  </th>
                  <td>{product._id}</td>
                  <td>{product.descriptionName}</td>
                  <td>{product.stock}</td>
                  <td>{product.category?.categoryName}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link to={`/updateform/${product._id}`}>
                      <button className={style.modProdStyleBtn}>
                        Modificar
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className={style.elimProdStyleBtn}
                      onClick={() => {
                        handleDelete(
                          product._id as string,
                          product.category?._id as string
                        );
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            // productsPerPage={productsPerPage}
            // dashboardProducts={dashboardProducts.length}
            // paginado={paginado}
            // currentPage={currentPage}
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

export default Dashboard;
