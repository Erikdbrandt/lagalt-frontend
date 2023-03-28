import { Link } from "react-router-dom";
import {useUser} from "../components/context/UserContext"
import keycloak from "../keycloak";
import { useEffect, useState } from "react";
import { loginUser, updateUser } from "../api/userService";
import PopUp from "../components/PopUps/PopUp";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const { user, handleLogin, handleLogout, handleUpdateUser } = useUser();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user)
        if (!user && keycloak.authenticated) {
            loadUserProfile();
        } else if (user && !keycloak.authenticated) {
            handleLogout();
        }


        const tokenRefreshInterval = setInterval(() => {
            if (keycloak.authenticated) {
                keycloak.updateToken(1)
                    .then(refreshed => {
                        if (refreshed) {
                            console.log("Token refreshed");
                        } else {
                            console.log("Token not refreshed, valid for another "
                                + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000)
                                + " seconds");
                        }
                    })
                    .catch(error => console.error("Error refreshing token:", error));
            }
        }, 5000);

        return () => clearInterval(tokenRefreshInterval);
    }, [keycloak.authenticated, user]);

    const loadUserProfile = async () => {
        try {
            const userProfile = await keycloak.loadUserProfile();
            const [error, { user: user, isNewUser }] = await loginUser(
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

            handleLogin(user);
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
            navigate('/');
            await keycloak.logout();

        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handlePopupSubmit = async (visibility) => {
        setShowPopup(false);

        user.userVisibility = visibility;

        const [updateError, updatedUser] = await updateUser(
            user.user_id,
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
        <div className="relative z-10">
            <div className="fixed top-0 bg-blue-500 h-14 flex items-center justify-between w-full p-2 mb-2">
                <div className="flex items-center">
                    <Link to="/startpage">
                        <img
                            className="h-14 cursor-pointer"
                            src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-17.png"
                            alt="Reddit Logo"
                        />
                    </Link>
                    <Link to="/startpage">
                        <div className="ml-2 text-lg font-bold text-white cursor-pointer">
                            lagalt
                        </div>
                    </Link>
                </div>
                <div className="flex items-center">
                    {keycloak.authenticated && (
                        <>
                            <Link to="/profile">
                                <div className="mr-4 cursor-pointer text-white font-bold">
                                    Profile
                                </div>
                            </Link>
                            <Link to="/startpage">
                                <div className="mr-4 cursor-pointer text-white font-bold">
                                    StartPage
                                </div>
                            </Link>
                        </>
                    )}
                    <div>
                        <section className="actions">
                            {keycloak.authenticated ? (
                                <button
                                    className="text-white font-bold"
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="text-white font-bold"
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </button>
                            )}
                        </section>
                    </div>
                </div>
                {showPopup && <PopUp handlePopupSubmit={handlePopupSubmit} />}
            </div>
        </div>
    );
};

export default Navbar;
