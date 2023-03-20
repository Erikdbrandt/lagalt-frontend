/*
import keycloak from "../keycloak";
import { useState, useEffect } from "react";
import axios from "axios";
import { loginUser } from "../api/userService";
*/

function StartPage() {
/*
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const isAuthenticated = keycloak.authenticated;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("User loaded from local storage");
        } else if (isAuthenticated) {
            console.log("User is authenticated and there is no user");
            loadUserProfile();
        }
    }, [isAuthenticated]);

    const loadUserProfile = async () => {
        try {
            const userProfile = await keycloak.loadUserProfile();
            setUser(userProfile);

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
*/

    return (
        <div>
            <h1>Start Page</h1>

          {/*  <section className="actions">
                {!isAuthenticated && <button onClick={handleLogin}>Login</button>}
                {isAuthenticated && (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </section>

            {user && (
                <div>
                    <h4>User Info</h4>
                    username: {user.full_name} <br />
                </div>
            )}*/}
        </div>
    );
}

export default StartPage;
