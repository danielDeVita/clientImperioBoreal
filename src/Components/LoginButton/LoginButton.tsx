import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./LoginButton.module.css";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className={style.loginBtn} onClick={() => loginWithRedirect()}>
      Iniciar sesión
      <i className='fas fa-right-to-bracket'></i>
    </button>
  );
};

export default LoginButton;
