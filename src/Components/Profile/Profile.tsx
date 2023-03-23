import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css"
import { Link } from "react-router-dom";



const Profile: any = () => {
  const { user, isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {
        !isAuthenticated ? loginWithRedirect() : (
          <div className={styles.profileContainer}>
            <img className={styles.profileImage} src={user?.picture} alt={user?.name} />
            <div className={styles.profileDetails}>
              <h2 className={styles.profileName}>{user?.name}</h2>
              <p className={styles.profilEmail}>email: {user?.email}</p>
              <p className={styles.profileNickname}>nickname: {user?.nickname}</p>
            </div>
            <Link to={"/"}>
              <button className={styles.button}>Volver</button>
            </Link>
          </div>
        )
      }
    </>
  );
};

export default Profile;