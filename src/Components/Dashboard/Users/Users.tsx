import { User, State } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getUsers } from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import style from "../Users/Users.module.css";

const Users: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state: State) => state.users);
  console.log(users);

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

  return (
    <>
      {!isAuthenticated ? (
        loginWithRedirect()
      ) : (
        <>
          <Link to='/dashboard'>
            <button className={style.Backbutton}>Volver</button>
          </Link>

          {users.map((user) => {
            return (
              <div className={style.userCard}>
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
        </>
      )}
    </>
  );
};

export default Users;
