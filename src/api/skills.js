import keycloak from "../keycloak"
export async function getAllSkills() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/skill', {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error(error);
        return [];
    }
}
