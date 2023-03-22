import { Link } from "react-router-dom";
import {useUser} from "../components/context/UserContext"
import keycloak from "../keycloak";
import { useEffect, useState } from "react";
import { loginUser, updateUser } from "../api/userService";
import PopUp from "../components/PopUps/PopUp";

const Navbar = () => {
    const { user, handleLogin, handleLogout, handleUpdateUser } = useUser();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        console.log(user)
        if (!user && keycloak.authenticated) {
            loadUserProfile();
        }else if(user && !keycloak.authenticated){
            handleLogout();
        }
    }, [keycloak.authenticated, user]);

    const loadUserProfile = async () => {
        try {
            const userProfile = await keycloak.loadUserProfile();
            const [error, { user: newUser, isNewUser }] = await loginUser(
                userProfile,
                keycloak.realmAccess.roles[1]
            );

            if (error) {
                console.log(error);
                return;
            }

            if (isNewUser) {
                setShowPopup(true);
            }

            handleLogin(newUser);
        } catch (error) {
            console.error("Error loading user profile:", error);
        }
    };

    const handleLoginClick = async () => {
        try {
            await keycloak.login();
            await loadUserProfile();
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogoutClick = async () => {
        try {
            handleLogout();
            await keycloak.logout();

        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handlePopupSubmit = async (visibility) => {
        setShowPopup(false);
        const [updateError, updatedUser] = await updateUser(
            user.user_id,
            visibility,
            user
        );

        if (updateError) {
            console.log(updateError);
            return;
        }

        handleUpdateUser(updatedUser);
        console.log(`Updated user with ID: ${user.user_id}`);
    };

    return (
        <div className="bg-blue-100 h-14 flex items-center justify-between p-2">
            <div className="flex items-center">
                <Link to="/user">
                    <img
                        className="h-14 cursor-pointer"
                        src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-17.png"
                        alt="Reddit Logo"
                    />
                </Link>
                <Link to="/user">
                    <div className="ml-2 text-lg font-bold text-xl cursor-pointer">
                        lagalt
                    </div>
                </Link>
            </div>
            <div className="flex items-center">
                {keycloak.authenticated && (
                    <>
                        <Link to="/profile">
                            <div className="mr-4 cursor-pointer">Profile</div>
                        </Link>
                        <Link to="/startpage">
                            <div className="mr-4 cursor-pointer">StartPage</div>
                        </Link>
                    </>
                )}
                <div>
                    <section className="actions">
                        {keycloak.authenticated ? (
                            <button onClick={handleLogoutClick}>Logout</button>
                        ) : (
                            <button onClick={handleLoginClick}>Login</button>
                        )}
                    </section>
                </div>
            </div>
            {showPopup && <PopUp handlePopupSubmit={handlePopupSubmit} />}
        </div>
    );
};

export default Navbar;
