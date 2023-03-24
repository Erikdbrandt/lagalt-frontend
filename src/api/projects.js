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


export const getAllProjectsFromAUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/user/projects/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error(
                `PROJECT_DID_NOT_FOUND: ${userId}`
            )
        }

        const projects = await response.json();
        console.log(projects);
        return [null, projects];
    } catch (error) {
        console.error(error);
        return [error.message, []];
    }
}
