import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./LoginButton.module.css";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

<<<<<<< HEAD
    return <button className={style.loginBtn} onClick={() => loginWithRedirect()}>Iniciar sesión<i className="fas fa-right-to-bracket"></i></button>;
=======
  return (
    <button className={style.loginBtn} onClick={() => loginWithRedirect()}>
      Iniciar sesión
      <i className='fas fa-right-to-bracket'></i>
    </button>
  );
>>>>>>> b4fa3780b37ec42b5f5cf1555d2de0e5a325e189
};

export default LoginButton;
