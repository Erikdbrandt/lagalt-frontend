import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

const ProjectCard = ({ project, allUsers, allSkills }) => {
    const { user } = useUser();
    const [missingSkills, setMissingSkills] = useState([]);
    const [yourSkillsInDemand, setYourSkillsInDemand] = useState([]);
    const [isParticipant, setIsParticipant] = useState(false);



    useEffect(() => {
        const projectSkills = project.skills;
        const participantIds = project.participants;
        const participants = allUsers.filter((participantUser) => participantIds.includes(participantUser.user_id));

        const participantSkills = participants.map((participant) => participant.skills);



        const skillsMissing = projectSkills.filter((skill) => {
            const found = participantSkills.some((participantSkill) => {
                return participantSkill.includes(skill);
            });
            return !found;
        })

        setMissingSkills(skillsMissing)



        const userSkills = user.skills;

        const matchingUserSkills = userSkills.filter((skill) => {
            const found = skillsMissing.some((missingSkill) => {
                return missingSkill === skill;
            });
            return found;
        });

        const skillObjects = allSkills.filter((skill) => matchingUserSkills.includes(skill.skill_id))


        setYourSkillsInDemand(skillObjects)


        const isParticipant = project.participants.includes(user.user_id);

        setIsParticipant(isParticipant)

        console.log("Hi")

    }, [allUsers, project, user,yourSkillsInDemand]);



    return (
        <div className={`m-3.5 bg-white rounded-lg shadow-md overflow-hidden ${yourSkillsInDemand.length > 0 ? 'ring-2 ring-yellow-500' : ''}`}>

            {isParticipant && (
                <div className="bg-green-500 text-white px-2 py-1">You are a participant in this project</div>
            )}
            <div className="flex items-center">
                <div className="p-4">
                    <img
                        src="https://picsum.photos/200/300"
                        alt="projectimg"
                        className="w-20 h-20 rounded-full"
                    />
                </div>
                <div className="p-4 flex-grow">
                    <Link to={`/project/${project.project_id}`}>
                        <div className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-300">
                            {project.title}
                        </div>
                    </Link>
                    <div className="text-base text-gray-600">{`Description: ${project.description}`}</div>
                    <div className="text-base text-gray-600">{`Field: ${project.project_type}`}</div>
                    <div className="text-base text-gray-600">{`Project Owner: ${project.owner}`}</div>
                    <div className="text-base text-gray-600">{`Theme: ${project.theme}`}</div>
                    {yourSkillsInDemand.length > 0 && (
                        <div className="text-base text-yellow-600">{`Your skills in Demand: ${yourSkillsInDemand.map(skill => skill.name).join(", ")}`}</div>
                    )}
                </div>
            </div>
        </div>
    );


};

export default ProjectCard;
