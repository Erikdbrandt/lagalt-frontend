import React from 'react';
import keycloak from "../keycloak";

const UserProfile = () => {


    return (
        <div>
            <h1>Profile Page</h1>
            { keycloak.tokenParsed &&
                <div>
                    <h4>User</h4>

                    <p>Name: { keycloak.tokenParsed.name}</p>
                    <p>Username: { keycloak.tokenParsed.email}</p>
                    <p>Sub: { keycloak.tokenParsed.sub }</p>

                </div>
            }
        </div>
    );
};

export default UserProfile;