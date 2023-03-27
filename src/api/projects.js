import keycloak from "../keycloak"

export async function getAllProjects() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/project', {
         /*   headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },*/
        });

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
