import keycloak from "../keycloak";
import axios from "axios";

/**
 * This function checks the backend for a user with a specfic email.
 * @param email
 * @returns {Promise<any[]|(*|*[])[]>}
 */
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


/**
 * this function fetches a list of users by their ids
 * @param userIds
 * @returns {Promise<*|*[]>}
 */
export const getUsersByIds = async (userIds) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/user?id=${userIds}`,
            {
              /*  headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },*/
            }
        );

        const users = response.data;
        const filteredUsers = users.filter((user) => userIds.includes(user.user_id));
        return filteredUsers.map((user) => user.full_name);
    } catch (error) {
        console.error(error);
        return [];
    }
};


/**
 * This function creates a new user in the backend
 * @param userProfile
 * @returns {Promise<any[]|(*|*[])[]>}
 */
const createUser = async (userProfile) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/user/create",
            {
                email: userProfile.email,
                full_name: userProfile.firstName + " " + userProfile.lastName,
                userVisibility: "REGULAR"

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

/**
 * this function checks if a user exists in the backend and creates a new user if not
 * @param userProfile
 * @returns {Promise<[null,{isNewUser: boolean, user: *}]|[*,{isNewUser: boolean, user: null}]>}
 */
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


/**
 * This function updates the skills of a user
 * @param userId
 * @param skills
 * @returns {Promise<any[]|(*|*[])[]>}
 */
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

/**
 * This function updates the user data
 * @param userId
 * @param userData
 * @returns {Promise<any[]|(*|*[])[]>}
 */

export const updateUser = async (userId, userData) => {
    try {
        const updatedUserData = {
            ...userData,

        };

        console.log(updatedUserData)


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
           /*     headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },*/
            }
        );


        return response.data;
    }catch (error) {
        console.error(error);
        return [];
    }
}