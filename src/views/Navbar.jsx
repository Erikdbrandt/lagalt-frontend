import {Link } from "react-router-dom";
import keycloak from "../keycloak";
import StartPage from "./StartPage";

const Navbar = () => {
    const handleLogout = () => {
        keycloak.logout({ redirectUri: window.location.origin });
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
                            <button onClick={() => keycloak.login()}>Login</button>
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
