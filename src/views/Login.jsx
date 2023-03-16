import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

const Login = () => {
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const keycloakInstance = Keycloak('/keycloak.json');

        keycloakInstance.init({ onLoad: 'login-required' }).then((authenticated) => {
            setKeycloak(keycloakInstance);
            setAuthenticated(authenticated);
        });
    }, []);

    useEffect(() => {
        if (authenticated && keycloak) {
            keycloak.loadUserProfile().then((profile) => {
                setUser({
                    id: profile.id,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: profile.email,
                });
            });
        }
    }, [authenticated, keycloak]);

    const handleLogout = () => {
        keycloak.logout();
    };

    return (
        <div>
            {authenticated ? (
                <div>
                    <p>You are logged in as {user.firstName} {user.lastName} ({user.email})</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Logging in...</p>
            )}
        </div>
    );
};
export default Login;