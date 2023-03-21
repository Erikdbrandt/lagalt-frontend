import React, { useState } from "react";
import { useUser } from "../components/context/UserContext";
import { updateUser } from "../api/userService";
import SkillPopup from "../components/PopUps/SkillPopup";

const UserProfile = () => {
    const { user, handleUpdateUser } = useUser();
    const [visibility, setVisibility] = useState(user.userVisibility);
    const [showPopup, setShowPopup] = useState(false);

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

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSaveSkills = (selectedSkills) => {
        console.log(selectedSkills);
        // Do something with the selected skills
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
