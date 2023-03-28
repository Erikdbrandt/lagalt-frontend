import {useParams} from "react-router-dom"
import React, {useEffect, useState} from "react"
import keycloak from "../../keycloak";
import {Badge, Descriptions, Form, Select, Button} from 'antd';
import {CheckSquareFilled} from '@ant-design/icons';
import {useUser} from "../context/UserContext";
import {getUsersByIds} from "../../api/userService";
import '../../index.css';
import axios from "axios";

const ProjectInfo = () => {
    const {id} = useParams();
    const [project, setProject] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [skillNames, setSkillNames] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [ownerName, setOwnerName] = useState("");
    const [joined, setJoined] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [form] = Form.useForm();

    const {user} = useUser();

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/project/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProject(data);
                const participantsIds = data && data.participants ? data.participants : [];
                const ownerId = data && data.owner ? data.owner : "";
                getUsersByIds([...participantsIds, ownerId])
                    .then((participantNames) => {
                        setParticipants(participantNames);
                        if (keycloak.authenticated && participantsIds.includes(user.user_id)) {
                            setJoined(true);
                        }
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }, [id, keycloak, getUsersByIds]);


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

    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showPopup]);

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

    const handleClick = async (values) => {
        try {
            const updatedProject = {...project, project_status: values.project_status};
            const response = await axios.patch(`http://localhost:8080/api/v1/project/update/${id}`, updatedProject);
            console.log("The status has been changed!" + project.project_status)
            setProject(updatedProject);
            form.resetFields();
            setIsDirty(false);
            setShowPopup(true);
        } catch (error) {
            console.error(error)
        }
    };

    const handleSelectChange = () => {
        setIsDirty(true);
    };

    return (

        <div>
            <div>
                {keycloak.authenticated && project && project.owner === user.user_id ? (
                    <h1 className="text-page mt-8 pl-8">Admin page</h1>
                ) : (
                    <h1 className="text-page mt-8 pl-8">Project info</h1>
                )}
            </div>
            {project ? (
                <div className="p-8">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label={
                            <span className="text">Title</span>
                        }>{project.title}</Descriptions.Item>
                        <Descriptions.Item label={
                            <span className="text">Description</span>
                        }>{project.description}</Descriptions.Item>
                        <Descriptions.Item label={
                            <span className="text">Project type</span>
                        }>{project.project_type}</Descriptions.Item>
                        <Descriptions.Item label={
                            <span className="text">Theme</span>
                        }>{project.theme}</Descriptions.Item>
                        <Descriptions.Item label={
                            <span className="text">Owner</span>
                        }>{ownerName}</Descriptions.Item>

                        {keycloak.authenticated && project && project.owner !== user.user_id && (
                            <Descriptions.Item label={<span
                                className="text">Status</span>}>{project.project_status}</Descriptions.Item>
                        )}

                        <Descriptions.Item label={
                            <span className="text">Participants</span>
                        }>
                            {project && participants.length > 0 ? (
                                <ul>
                                    {participants.map((participant) => (
                                        <li key={participant}>
          <span className={participant === ownerName ? "owner-name" : ""}>
            {participant}
          </span>
                                            {participant === ownerName ? (
                                                <Badge/>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                "No participants"
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label={
                            <span className="text">Skills</span>
                        }>
                            <ul>
                                {skillNames.map(skillName =>
                                    <li key={skillName}>{skillName}</li>
                                )}
                            </ul>
                        </Descriptions.Item>
                    </Descriptions>

                    {keycloak.authenticated && project && project.owner === user.user_id ? (
                        <Form form={form} onFinish={handleClick}>
                            <Form.Item
                                label={<span className="text">Status</span>}
                                name="project_status"
                                initialValue={project.project_status}
                            >
                                <Select className="w-2/3" onChange={handleSelectChange}>
                                    <Select.Option value="FOUNDING" className="text2">
                                        FOUNDING
                                    </Select.Option>
                                    <Select.Option value="IN_PROGRESS" className="text2">
                                        IN_PROGRESS
                                    </Select.Option>
                                    <Select.Option value="STALLED" className="text2">
                                        STALLED
                                    </Select.Option>
                                    <Select.Option value="COMPLETED" className="text2">
                                        COMPLETED
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" className="btn" disabled={!isDirty}>
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        joined ? (
                            <button onClick={handleUnjoinClick}
                                    className="bg-red-400 text-white font-bold py-2 px-4 rounded mt-4">
                                Unjoin
                            </button>
                        ) : (
                            <button onClick={handleJoinClick}
                                    className="bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4">
                                Join
                            </button>
                        )
                    )}
                </div>
            ) : (
                <p>Loading project data...</p>
            )}

            {showPopup ? (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5"
                    onClick={handleOverlayClick}>
                    <div className="bg-white w-1/3 h-1/3 rounded-md flex flex-col justify-center items-center p-1">
                        <p className="text-2xl p-5">Status has been changed!</p>

                        <CheckSquareFilled style={{color: '#8fbc8f', fontSize: '50px'}}/>

                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProjectInfo;