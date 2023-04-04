import { User, State } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getUsers } from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import style from "../Users/Users.module.css";
import Pagination from "../../Pagination/Pagination";
import stylePag from "../../Pagination/Pagination.module.css";
import { CartContextType } from "../../../types.d";
import { CartContext } from "../../../context/index";

const Users: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const { totalCart, user: loggedUser, setUser } = useContext(CartContext) as CartContextType;

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state: State) => state.users);

  const handleDelete = async (_id: any) => {
    try {
      Swal.fire({
        title: "Seguro que quieres eliminar el usuario?",
        text: "No se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0fb1bd",
        confirmButtonText: "Eliminar",
        iconColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteUser = await axios.delete(`/users/${_id}`);
          dispatch(getUsers());
          Swal.fire(
            "Eliminado con éxito",
            "El usuario ha sido eliminado",
            "success"
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [userRole, setUserRole] = useState("");

  const handleChange = (e: any) => {
    setUserRole(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    _id: any
  ) => {
    try {
      e.preventDefault();
      await axios.put(`/users/${_id}`, { userRole });
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  };
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

  for (let i = 1; i <= Math.ceil(users?.length / itemsPerPage); i++) {
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
    setCurrentItems(users?.slice(indexOfFirsttItem, indexOfLastItem));
  }, [users, indexOfFirsttItem, indexOfLastItem]);
  return (
    <>
      {user?.email !== import.meta.env.VITE_ADMIN_EMAIL ? (
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
          {currentItems?.map((user) => {
            return (
              <div key={user._id} className={style.userCard}>
                <div className={style.userTitle}>
                  <strong>Usuario:</strong>
                  <strong>Id de usuario:</strong>
                  <strong>Email:</strong>
                  <strong>Rol:</strong>
                </div>
                <div className={style.userInfo}>
                  <p>{user.username}</p>
                  <p>{user._id}</p>
                  <p>{user.email}</p>
                  <p>{user.isAdmin ? "Administrador" : "No-Administrador"}</p>
                </div>

                <div className={style.btnContainer}>
                  <form
                    className={style.formUser}
                    onSubmit={(e) => {
                      handleSubmit(e, user._id);
                    }}
                  >
                    <label htmlFor='admin'>Admin</label>
                    <input
                      onChange={handleChange}
                      type='radio'
                      value='admin'
                      name='userRole'
                    />

                    <label htmlFor='user'>User</label>
                    <input
                      onChange={handleChange}
                      type='radio'
                      value='user'
                      name='userRole'
                    />

                    <button className={style.btnModificar} type='submit'>
                      Modificar
                    </button>
                    <button
                      className={style.btnEliminar}
                      onClick={() => handleDelete(user._id)}
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
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

export default Users;
