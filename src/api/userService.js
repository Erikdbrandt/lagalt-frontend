import keycloak from "../keycloak";
import axios from "axios";

const loadUserProfile = async () => {
    try {
        const userProfile = await keycloak.loadUserProfile();
        const { data } = await axios.get(`http://localhost:8080/api/v1/user/email/${userProfile.email}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        if (data) {
            console.log("User exists:", data);
            localStorage.setItem("user", JSON.stringify(userProfile));
        } else {
            console.log("User does not exist");

            const userToCreate = {
                email: userProfile.email,
                full_name: userProfile.firstName + " " + userProfile.lastName,
                userVisibility: "REGULAR",
            };

            const response = await axios.post("http://localhost:8080/api/v1/user/create", userToCreate, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            });

            console.log("User created:", response.data);
            localStorage.setItem("user", JSON.stringify(userProfile));
        }

        return [null, userProfile];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

export default loadUserProfile;
