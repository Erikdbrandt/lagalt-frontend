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

export const getUsersByIds = async (userIds) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/user?id=${userIds}`,
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        const users = response.data;
        const filteredUsers = users.filter((user) => userIds.includes(user.user_id));
        const userNames = filteredUsers.map((user) => user.full_name);
        return userNames;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const createUser = async (userProfile, authorityRole) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/user/create",
            {
                email: userProfile.email,
                full_name: userProfile.firstName + " " + userProfile.lastName,
                userVisibility: "REGULAR"
             //   authorityType: authorityRole,
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

export const loginUser = async (userProfile, authorityRole) => {
    const [checkError, user] = await checkForUser(userProfile.email);

    if (checkError !== null) {
        return [checkError, { user: null, isNewUser: false }];
    }

    if (user) {
        console.log("we got an existing user" + user);
        return [null, { user: user, isNewUser: false }];
    }

    console.log("we got a new user" + userProfile);
    const [createError, newUser] = await createUser(userProfile, authorityRole);

    if (createError) {
        return [createError, { user: null, isNewUser: false }];
    }

    return [null, { user: newUser, isNewUser: true }];
};

export const updateSkillsInUser = async (userId, skills) => {
    try {

        const response = await axios.put(
            `http://localhost:8080/api/v1/user/update/skills/${userId}`,
            skills,
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        if (response.status < 200 || response.status >= 300) {
            throw new Error(
                `Could not update user with ID: ${userId}`
            );
        }

        const user = await response.data;

        console.log(user)
        console.log(`Updated user with ID: ${userId}`);
        return [null, user];
    } catch (error) {
        return [error.message, []];
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const updatedUserData = {
            ...userData,

        };

        console.log(updatedUserData)

        console.log("we are here ")
        const response = await axios.put(
            `http://localhost:8080/api/v1/user/update/${userId}`,
            updatedUserData,
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        console.log(response.status)

        if (response.status < 200 || response.status >= 300) {
            throw new Error(
                `Could not update user with ID: ${userId}`
            );
        }


        const user = await response.data;

        console.log(user)
        console.log(`Updated user with ID: ${userId}`);
        return [null, user];
    } catch (error) {
        return [error.message, []];
    }
};

// get all users

export const getAllUsers = async () => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/user`,
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        return response.data;
    }catch (error) {
        console.error(error);
        return [];
    }
}