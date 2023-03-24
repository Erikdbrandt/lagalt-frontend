import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import keycloak from "../../keycloak";
import {Badge, Descriptions} from 'antd';
import { CheckSquareFilled } from '@ant-design/icons';
import {useUser} from "../context/UserContext";

const ProjectInfo = () => {
    const {id} = useParams(); // extract project ID from URL path
    const [project, setProject] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [skillNames, setSkillNames] = useState([]);
    const [ownerName, setOwnerName] = useState("");
    const [joined, setJoined] = useState(false);
    const {user} = useUser();

    useEffect(() => {
        // Fetch project data from API using the project ID
        fetch(`http://localhost:8080/api/v1/project/${id}`)
            .then((response) => response.json())
            .then((data) => setProject(data))
            .catch((error) => console.error(error));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/project/skills/${id}`)
            .then((response) => response.json())
            .then((data) => setSkillNames(data))
            .catch((error) => console.error(error));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/project/ownerName/${id}`)
            .then((response) => response.text())
            .then((data) => setOwnerName(data))
            .catch((error) => console.error(error));
    }, [id]);

    function handleOverlayClick() {
        setShowPopup(false);
    }

    const handleJoinClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/project/join/participantId/${user.user_id}/projectId/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setJoined(true);
            setShowPopup(true);
        } catch (error) {
            console.error(error);
        }
    };
    const handleUnjoinClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/project/unjoin/participantId/${user.user_id}/projectId/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setJoined(false);
            setShowPopup(true)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            {project ? (
                <div className="p-8 ">
                    <Descriptions title="Project Info" layout="vertical">
                        <Descriptions.Item label="Title">{project.title}</Descriptions.Item>
                        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                        <Descriptions.Item label="Project type">{project.project_type}</Descriptions.Item>
                        <Descriptions.Item label="Theme">{project.theme}</Descriptions.Item>
                        <Descriptions.Item label="Owner">{ownerName}</Descriptions.Item>
                        <Descriptions.Item label="Status">{project.project_status}</Descriptions.Item>
                        {/*<Descriptions.Item label="Participants">{project.participants}</Descriptions.Item>*/}
                        <Descriptions.Item label="Skills">
                            <ul>
                                {skillNames.map(skillName =>
                                    <li key={skillName}>{skillName}</li>
                                )}
                            </ul>
                        </Descriptions.Item>
                    </Descriptions>
                    {keycloak.authenticated &&
                        (
                            joined ?
                                <button onClick={handleUnjoinClick} className="bg-red-400 text-white font-bold py-2 px-4 rounded mt-4">
                                    Unjoin
                                </button> :
                            <button onClick={handleJoinClick}
                                 className="bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4">Join</button>)}

                </div>
            ) : (
                <p>Loading project data...</p>
            )}

            {showPopup ? (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5"
                    onClick={handleOverlayClick} >
                    <div className="bg-white w-1/3 h-1/3 rounded-md flex flex-col justify-center items-center p-1">
                        <p className="text-2xl p-5">{joined ? 'Welcome to the project!' : 'You have unjoined the project!'}</p>

                        <CheckSquareFilled  style={{ color: '#8fbc8f', fontSize: '50px' }} />

                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default ProjectInfo;