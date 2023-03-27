import keycloak from "../keycloak"

export async function getAllProjects() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/project', {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}


// This function fetches all projects belonging to a user with the specified user ID.
export const getAllProjectsFromAUser = async (userId) => {
    try {
        // Send a GET request to the API endpoint that corresponds to the specified user ID.
        const response = await fetch(`http://localhost:8080/api/v1/user/projects/user/${userId}`, {
            headers: {
                // Include an Authorization header with a bearer token for authentication.
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        // If the API response status is not 200, throw an error with a specific message.
        if (response.status !== 200) {
            throw new Error(
                `PROJECT_DID_NOT_FOUND: ${userId}`
            )
        }
        // Parse the response body as JSON and return it as the second element of an array.
        const projects = await response.json();
        return [null, projects];
    } catch (error) {
        // Log any errors to the console and return an empty array as the second element of an array.
        console.error(error);
        return [error.message, []];
    }
}

export const getAllProjectsFromAUserParticipant = async (userId) => {
    try {
        // Send a GET request to the API endpoint that corresponds to the specified user ID.
        const response = await fetch(`http://localhost:8080/api/v1/user/projects/participants/user/${userId}`, {
            headers: {
                // Include an Authorization header with a bearer token for authentication.
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        // If the API response status is not 200, throw an error with a specific message.
        if (response.status !== 200) {
            throw new Error(
                `PROJECT_DID_NOT_FOUND: ${userId}`
            )
        }
        // Parse the response body as JSON and return it as the second element of an array.
        const projects = await response.json();
        return [null, projects];
    } catch (error) {
        // Log any errors to the console and return an empty array as the second element of an array.
        console.error(error);
        return [error.message, []];
    }
}

