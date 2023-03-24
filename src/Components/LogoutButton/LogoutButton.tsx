import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./LogoutButton.module.css";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

<<<<<<< HEAD
    return (
        <button className={style.logoutBtn}  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Cerrar sesión
     <i className="fas fa-right-from-bracket"></i>
        </button>
    );
=======
  return (
    <button
      className={style.logoutBtn}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar sesión
      <i className='fas fa-right-from-bracket'></i>
    </button>
  );
>>>>>>> b4fa3780b37ec42b5f5cf1555d2de0e5a325e189
};

export default LogoutButton;
