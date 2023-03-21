import { useAuth0 } from "@auth0/auth0-react";
import { User } from "auth0";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0<User>();
    if (isLoading) {
        return <div>Loading ...</div>
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user?.picture} alt={user?.name} />
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
            </div>
        )
    )
};

export default Profile;