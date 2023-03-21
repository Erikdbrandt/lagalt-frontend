import React, { useState } from "react";
import { useUser } from "../components/context/UserContext";
import {updateUser} from "../api/userService"

const UserProfile = () => {
    const { user, handleUpdateUser } = useUser();
    const [visibility, setVisibility] = useState(user.userVisibility);

    const toggleVisibility = async () => {
        const updatedVisibility = visibility === "REGULAR" ? "HIDDEN" : "REGULAR";
        const [error, updatedUser] = await updateUser(user.user_id, updatedVisibility, user);

        if (error) {
            console.log(error);
            return;
        }

        handleUpdateUser(updatedUser);
        setVisibility(updatedVisibility);
    };


    return (
        <div>
            <h1>Profile Page</h1>
            {user && (
                <div>
                    <h4>User</h4>
                    <p>Name: {user.name}</p>
                    <p>Username: {user.email}</p>
                    <p>
                        Visibility: {user.userVisibility === "REGULAR" ? "Visible" : "Hidden"}{" "}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleVisibility}>
                            {user.userVisibility === "REGULAR" ? "Hide" : "Show"}
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
