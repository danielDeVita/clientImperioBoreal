import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css"
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading"
import { CartContextType, State } from "../../types.d";
import {useContext, useEffect} from 'react';
import { CartContext } from "../../context";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { getUserOrders } from "../../Redux/actions";
import CardOrder from "./CardOrder/CardOrder"
import { useSelector } from "react-redux";


const Profile: any = () => {
  const { user, isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();
  const { userId } = useContext(CartContext) as CartContextType
  const dispatch:AppDispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getUserOrders(userId))
  }, [userId])

  const orders = useSelector((state: State) => state.ordersByUser)
  
  if (isLoading) {
    return <div> <Loading /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <>
      {
        !isAuthenticated ? loginWithRedirect() : (
          
          <div className={styles.Container}>
            <div className={styles.profileContainer}>
            <img className={styles.profileImage} src={user?.picture} alt={user?.name} />
            <div className={styles.profileDetails}>
              <h2 className={styles.profileName}>{user?.name}</h2>
              <p className={styles.profilEmail}>email: {user?.email}</p>
              <p className={styles.profileNickname}>nickname: {user?.nickname}</p>
            </div>
            <Link to={"/"}>
              <button className={styles.Backbutton}>Volver</button>
            </Link>
          </div>
            </div>
          

         
        )
      }
                  {
              
              orders.map(order => {
                return (
                  
                  <CardOrder 
                  key={order.orderId}
                  user={order.user}
                  status={order.status}
                  cart={order.cart}
                  orderId = {order.orderId}
                  />
                  )
                })
                
              }
      </>
  );
};

export default Profile;