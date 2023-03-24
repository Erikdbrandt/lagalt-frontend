import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

const ProjectCard = ({ project, allUsers }) => {
    const { user } = useUser();
    const [missingSkills, setMissingSkills] = useState([]);


    useEffect(() => {
        const projectSkills = project.skills;
        const participantIds = project.participants;
        const participants = allUsers.filter((participantUser) => participantIds.includes(participantUser.user_id));

        console.log(participants)
        console.log(projectSkills)

        console.log("Participants:", participants);
        console.log("Number of participants:", participants.length);
        console.log("Project skills:", projectSkills);
        console.log("Number of project skills:", projectSkills.length);

        const neededSkills = projectSkills.filter((skill) => {
            const found = participants.some((participant) => {
                const hasSkill = participant.skills.some((participantSkill) => {
                    console.log(participantSkill, "   ", skill);
                    return participantSkill === skill;
                });
                console.log(`Participant ${participant.user_id} ${hasSkill ? 'has' : 'does not have'} skill ${skill}`);
                return hasSkill;
            });

        });
        console.log("Missing skills:", neededSkills);


    }, [allUsers, project, user]);



    return (
        <div className="border-2 bg-white p-5 flex">
            <div className="card_left flex-none mr-5">
                <img
                    src="https://picsum.photos/200/300"
                    alt="projectimg"
                    className="w-20 h-20 rounded"
                />
            </div>
            <div className="card_right flex-grow">
                <Link to={`/project/${project.project_id}`}>
                    <div className="old-reddit-font text-lg font-bold text-blue-400">
                        {project.title}
                    </div>
                </Link>
                <div className="old-reddit-font text-base">{`Description: ${project.description}`}</div>
                <div className="old-reddit-font text-base">{`Field: ${project.project_type}`}</div>
                <div className="old-reddit-font text-base">{`Project owner ID: ${project.owner}`}</div>
                <div className="old-reddit-font text-base">{`Theme: ${project.theme}`}</div>
                {missingSkills.length > 0 && (
                    <div className="old-reddit-font text-base">{`Missing Skills: ${missingSkills.join(", ")}`}</div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
