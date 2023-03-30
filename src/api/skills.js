import keycloak from "../keycloak"
import axios from "axios"

/**
 * Gets all skills from the backend
 * @returns {Promise<any[]|*[]>}
 */
export async function getAllSkills() {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/skill`,
            {
                /*headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },*/
            }
        );

        return [null, response.data];
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Creates a new skill in the backend
 * @param skill
 * @returns {Promise<any[]|(*|*[])[]>}
 */
export const createSkill = async (skill) => {
    try {

        const newSkill = {
            ...skill,
        }
        console.log("we are here ")
        console.log(skill)
        const response = await axios.post(
            "http://localhost:8080/api/v1/skill/create",
            {
                ...newSkill
            },
            {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );

        if (response.status < 200 || response.status >= 300) {
            throw new Error(
                "Could not create skill"
            );
        }

        const createdSkill = await response.data;

        console.log("created new skill" + createdSkill);
        return [null, createdSkill];
    } catch (error) {
        return [error.message, []];
    }
};


