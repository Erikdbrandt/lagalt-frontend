import React, {useState, useEffect} from "react";
import {useUser} from "../components/context/UserContext";
import {updateSkillsInUser, updateUser} from "../api/userService";
import SkillPopup from "../components/PopUps/SkillPopup";
import {getAllSkills} from "../api/skills";
import {getAllProjectsFromAUser, getAllProjectsFromAUserParticipant} from "../api/projects";


const UserProfile = () => {
    const {user, handleUpdateUser} = useUser();
    const [visibility, setVisibility] = useState(user.userVisibility);
    const [showPopup, setShowPopup] = useState(false);
    const [updatedSkills, setUpdatedSkills] = useState(user.skills || []);
    const [showMyProjects, setShowMyProjects] = useState(user.projects || [])
    const [showProjectThatIPatricipated, setShowProjectThatIPatricipated] = useState(user.projects || [])

    useEffect(() => {
        async function fetchUserProjects() {
            const [error, projects] = await getAllProjectsFromAUser(user.user_id);
            if (error) {
                console.log(error);
                return;
            }
            // console.log(projects)
            setShowMyProjects(projects);

        }

        fetchUserProjects();
    }, [user.user_id]);


    useEffect(() => {
        async function fetchProjectsThatUserParticipant() {
            const [error, projects] = await getAllProjectsFromAUserParticipant(user.user_id);
            if (error) {
                console.log(error);
                return;
            }
            // console.log(projects)
            setShowProjectThatIPatricipated(projects);

        }

        fetchProjectsThatUserParticipant();
    }, [user.user_id]);

    useEffect(() => {
        async function fetchSkills() {
            const [error, skills] = await getAllSkills();
            if (error) {
                console.log(error);
                return;
            }
            if (user.skills) {
                setUpdatedSkills(skills.filter(skill => user.skills.includes(skill.skill_id)));
            }
        }
        fetchSkills();
        setUpdatedSkills(user.skills || []);
    }, [user.skills]);
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
    const handleSaveSkills = async selectedSkills => {
        // Create a new array of skill IDs
        const skillIds = selectedSkills.map(skill => skill.skill_id);

        // Combine the selected skill IDs array with the existing user.skills array, or use an empty array if user.skills is null or undefined
        const updatedSkills = [...skillIds];

        // Call the API to update the user's skills
        const [error, updatedUser] = await updateSkillsInUser(user.user_id, updatedSkills);

        if (error) {
            console.log(error);
            return;
        }

        handleUpdateUser(updatedUser);
        setUpdatedSkills(selectedSkills);

        togglePopup();
    };
    const handleCancelSkills = () => {
        togglePopup();
    };

    return (
        <div className="mx-8 ">
            <h1 className="text-3xl font-bold my-8">Profile Page</h1>
            {user && (
                <div>
                    <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">

                        <p className="text-gray-700 mb-2">
                            <span className="font-bold">Name:</span> {user.full_name}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-bold">Username:</span> {user.email}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Visibility:</span>{" "}
                            {user.userVisibility === "REGULAR" ? "Visible" : "Hidden"}{" "}
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                                onClick={toggleVisibility}
                            >
                                {user.userVisibility === "REGULAR" ? "Hide" : "Show"}
                            </button>
                        </p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={togglePopup}
                        >
                            Edit Skills
                        </button>
                    </div>

                    {updatedSkills.length > 0 && (
                        <div>
                            <h4 className="text-lg font-medium my-4">Skills</h4>
                            <ul className="grid grid-cols-3 gap-4">
                                {updatedSkills.map(skill => (
                                    <li key={skill.skill_id}>
                                        <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
                                            <h5 className="text-lg font-medium mb-2">{skill.name}</h5>
                                            <p className="text-gray-700">{skill.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {showPopup && (
                        <SkillPopup onSaveSkills={handleSaveSkills} onCancel={handleCancelSkills}/>
                    )}
                </div>
            )}
            <div>
                {showMyProjects && showMyProjects.length > 0 ? (
                    <div>
                        <h4 className="text-lg font-medium my-4">Projects that I own</h4>
                        <ul className="grid grid-cols-3 gap-4">
                            {showMyProjects.map(project => (
                                <li key={project.project_id}>
                                    <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
                                        <h5 className="text-lg font-medium mb-2">{project.title}</h5>
                                        <p className="text-gray-700">{project.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h4 className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">YOU DON'T OWN ANY PROJECT</h4>
                )}

            </div>

            <div>
                {showProjectThatIPatricipated && showProjectThatIPatricipated.length > 0 ? (
                    <div>
                        <h4 className="text-lg font-medium my-4">Projects that I Participated</h4>
                        <ul className="grid grid-cols-3 gap-4">
                            {showProjectThatIPatricipated.map(project => (
                                <li key={project.project_id}>
                                    <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
                                        <h5 className="text-lg font-medium mb-2">{project.title}</h5>
                                        <p className="text-gray-700">{project.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h4 className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">CURRENTLY YOU DON'T PARTICIPATE ANY PROJECT</h4>
                )}

            </div>
        </div>
    );
};

export default UserProfile;
