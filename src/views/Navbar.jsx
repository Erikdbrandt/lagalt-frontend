import {Link} from "react-router-dom";
import keycloak from "../keycloak";
import {useEffect, useState} from "react"
import {loginUser} from "../api/userService"

const Navbar = () => {


    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("User loaded from local storage");
        } else if (keycloak.authenticated) {
            console.log("User is authenticated and there is no user");
            loadUserProfile();
        }
    }, [keycloak.authenticated]);

    const loadUserProfile = async () => {
        try {
            console.log("about to load user profile")
            const userProfile = await keycloak.loadUserProfile();
            setUser(userProfile);

            console.log("about to login user")
            const [error, user] = await loginUser(userProfile);

            if (error !== null) {
                console.log(error);
            }

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                console.log("User is set");
                setUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async () => {
        try {
            await keycloak.login();
            loadUserProfile();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            console.log("User is logged out");
            setUser(null);
            localStorage.removeItem("user");
            await keycloak.logout();
            console.log("User is removed");
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="bg-blue-100 h-14 flex items-center justify-between p-2">
            <div className="flex items-center">
                <Link to="/m">
                    <img
                        className="h-14 cursor-pointer"
                        src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-17.png"
                        alt="Reddit Logo"
                    />
                </Link>
                <Link to="/m">
                    <div className="ml-2 text-lg font-bold text-xl cursor-pointer">
                        lagalt
                    </div>
                </Link>
            </div>
            <div className="flex items-center">
                {keycloak.authenticated &&
                    (<Link to="/profile">
                        <div className="mr-4 cursor-pointer">Profile</div>
                    </Link>)}
                {keycloak.authenticated &&
                    (<Link to="/startpage">
                        <div className="mr-4 cursor-pointer">StartPage</div>
                    </Link>)}
                <div>
                    <section className="actions">
                        {!keycloak.authenticated && (
                            <button onClick={handleLogin}>Login</button>
                        )}
                        {keycloak.authenticated && (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
