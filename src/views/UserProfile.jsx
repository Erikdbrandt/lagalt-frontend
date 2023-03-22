import React, { useState } from "react";
import { useUser } from "../components/context/UserContext";
import {updateSkillsInUser, updateUser} from "../api/userService";
import SkillPopup from "../components/PopUps/SkillPopup";

const UserProfile = () => {
    const { user, handleUpdateUser } = useUser();
    const [visibility, setVisibility] = useState(user.userVisibility);
    const [showPopup, setShowPopup] = useState(false);

    const toggleVisibility = async () => {
        const updatedVisibility = visibility === "REGULAR" ? "HIDDEN" : "REGULAR";

        user.userVisibility = updatedVisibility;

        const [error, updatedUser] = await updateUser(user.user_id, user);

        if (error) {
            console.log(error);
            return;
        }

        handleUpdateUser(updatedUser);
        setVisibility(updatedVisibility);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSaveSkills = async (selectedSkills) => {
        // Create a new array of skill IDs
        const skillIds = selectedSkills.map(skill => skill.skill_id);

        // Combine the selected skill IDs array with the existing user.skills array
        const updatedSkills = [...user.skills, ...skillIds];

        // Call the API to update the user's skills
        const [error, updatedUser] = await updateSkillsInUser(user.user_id, updatedSkills);

        if (error) {
            console.log(error);
            return;
        }

        handleUpdateUser(updatedUser);

        togglePopup();
    };

    const handleCancelSkills = () => {
        togglePopup();
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {user && (
                <div>
                    <h4>User</h4>
                    <p>Name: {user.full_name}</p>
                    <p>Username: {user.email}</p>
                    <p>
                        Visibility: {user.userVisibility === "REGULAR" ? "Visible" : "Hidden"}{" "}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleVisibility}>
                            {user.userVisibility === "REGULAR" ? "Hide" : "Show"}
                        </button>
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={togglePopup}>
                        Show Skills
                    </button>
                    {showPopup && <SkillPopup onSaveSkills={handleSaveSkills} onCancel={handleCancelSkills} />}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
