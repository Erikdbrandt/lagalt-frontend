import keycloak from "../keycloak"
import axios from "axios"
export async function getAllSkills() {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/skill`,
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        return [null, response.data];
    } catch (error) {
        console.error(error);
        return [];
    }
}
