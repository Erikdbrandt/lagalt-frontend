import keycloak from "../keycloak";
import { useState, useEffect } from "react";
import axios from "axios";

function StartPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user:");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else if (keycloak.authenticated) {
            console.log("User is authenticated");
            loadUserProfile();
        }

    }, []);

    const loadUserProfile = async () => {
        try {
            const userProfile = await keycloak.loadUserProfile();
            setUser(userProfile);

            const { data } = await axios.get(
                `http://localhost:8080/api/v1/user/email/${userProfile.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                }
            );

            if (data) {
                console.log("User exists:", data);
                localStorage.setItem("user", JSON.stringify(userProfile));
            } else {
                console.log("User does not exist");

                const userToCreate = {
                    email: userProfile.email,
                    full_name: userProfile.firstName + " " + userProfile.lastName,
                    userVisibility: "REGULAR",
                };
                const response = await axios.post(
                    "http://localhost:8080/api/v1/user/create",
                    userToCreate,
                    {
                        headers: {
                            Authorization: `Bearer ${keycloak.token}`,
                        },
                    }
                );
                console.log("User created:", response.data);
                localStorage.setItem("user", JSON.stringify(userProfile));
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

    return (
        <div>
            <h1>Start Page</h1>

            <section className="actions">
                {!keycloak.authenticated && (
                    <button onClick={handleLogin}>Login</button>
                )}
                {keycloak.authenticated && (
                    <>
                        <p>
                            Welcome, {user?.firstName || ""} {user?.lastName || ""}!
                        </p>
                        <button onClick={() => keycloak.logout()}>Logout</button>
                    </>
                )}
            </section>

            {user && (
                <div>
                    <h4>User Info</h4>

                    username: {user.firstName} {user.lastName} <br />
                </div>
            )}
        </div>
    );
}

export default StartPage;
