import { User, State } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { getUsers } from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Users: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    const users = useSelector((state: State) => state.users)
    console.log(users)

    const handleDelete = async (_id: any) => {
        try {
            const deleteUser = await axios.delete(`/users/${_id}`);
            dispatch(getUsers());
        } catch (error) {
            console.error(error)
        }
    };

     const [userRole, setUserRole] = useState("")

    const handleChange = (e: any) => {
        setUserRole(e.target.value)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, _id: any) => {
        try {
            e.preventDefault();
            await axios.put(`/users/${_id}`, { userRole }); 
            dispatch(getUsers())
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            {users.map(user => {
                return (
                    <div>
                        <h2>Usuario: {user.username}</h2>
                        <h3>Id de usuario: {user._id}</h3>
                        <p>Email: {user.email}</p>
                        <p>Rol: {user.isAdmin ? "Administrador" : "No-Administrador"}</p>
                        <button onClick={() => handleDelete(user._id)}>Eliminar</button>

                        <form onSubmit={(e) => {handleSubmit(e, user._id)}}>
                            <label htmlFor="admin">Admin</label>
                            <input onChange={handleChange} type="radio" value="admin" name="userRole" />
                            
                            <label htmlFor="user">User</label>
                            <input  onChange={handleChange} type="radio" value="user" name="userRole" checked />
                            
                            <button type="submit">Modificar</button>
                     </form>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}

export default Users;