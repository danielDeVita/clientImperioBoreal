import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './LogoutButton.module.css'

const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    return (
        <button className={style.logoutBtn}  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
     <i className="fa-regular fa-right-from-bracket"></i>
        </button>
    );
};

export default LogoutButton;
