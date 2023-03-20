import keycloak from "../keycloak";
import axios from "axios";

const checkForUser = async (email) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/user/email/${email}`,
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        console.log("we got response" + response.data);
        return [null, response.data];
    } catch (error) {
        console.log("we got error");
        return [error.message, []];
    }
};

const createUser = async (userProfile) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/user/create",
            {
                email: userProfile.email,
                full_name: userProfile.firstName + " " + userProfile.lastName,
                userVisibility: "REGULAR",
            },
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        if (response.status < 200 || response.status >= 300) {
            throw new Error(
                "Could not create user with username: " + userProfile.email
            );
        }

        const user = await response.data;

        console.log("created new user" + user);
        return [null, user];
    } catch (error) {
        return [error.message, []];
    }
};

export const loginUser = async (userProfile) => {
    const [checkError, user] = await checkForUser(userProfile.email);

    if (checkError !== null) {
        return [checkError, { user: null, isNewUser: false }];
    }

    if (user) {
        console.log("we got an existing user" + user);
        return [null, { user: user, isNewUser: false }];
    }

    console.log("we got a new user" + userProfile);
    const [createError, newUser] = await createUser(userProfile);

    if (createError) {
        return [createError, { user: null, isNewUser: false }];
    }

    return [null, { user: newUser, isNewUser: true }];
};
