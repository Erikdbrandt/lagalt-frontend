import {Link} from "react-router-dom";
import {useUser} from "../context/UserContext";
import {useEffect, useState} from "react";

const ProjectCard = ({project, allUsers, allSkills}) => {
    const {user} = useUser();
    const [missingSkills, setMissingSkills] = useState([]);
    const [yourSkillsInDemand, setYourSkillsInDemand] = useState([]);
    const [isParticipant, setIsParticipant] = useState(false);
    const [projectOwnerName, setProjectOwnerName] = useState('');


    useEffect(() => {

        setProjectOwnerName(allUsers.find((appUser) => appUser.user_id === project.owner)?.full_name);

        if (user) {
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
                return skillsMissing.some((missingSkill) => {
                    return missingSkill === skill;
                });
            });

            const skillObjects = allSkills.filter((skill) => matchingUserSkills.includes(skill.skill_id))


            if (skillObjects.length > 0) {
                setYourSkillsInDemand(skillObjects)
            }

            const isParticipant = project.participants.includes(user.user_id);

            setIsParticipant(isParticipant)

        }


    }, [user]);


    return (
        <div className={`m-3.5 bg-white rounded-lg shadow-md overflow-hidden ${yourSkillsInDemand.length > 0 ? 'ring-2 ring-blue-500' : ''}`}>
            {isParticipant && (
                projectOwnerName !== user.full_name ?
                <div className="bg-blue-500 text-white px-2 py-1">You are a participant in this project</div>
                    :
                    <div className="bg-blue-500 text-white px-2 py-1">You are the owner of this project</div>
            )}
            <div className="flex items-center">
                <div className="p-4">
                    {yourSkillsInDemand.length > 0 ?
                        <img
                            src="https://techcrunch.com/wp-content/uploads/2015/04/uncle-sam-we-want-you1-kopie_1.png?w=1390&crop=1"
                            alt="Skills needed"
                            className="w-28  rounded"
                        /> :
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4150/4150746.png"
                            alt="projectimg"
                            className="w-20 justify-self-center flex rounded mt-2"
                            style={{ marginTop: "-0.5rem" }}
                        />
                    }
                </div>
                <div className="p-4 flex-grow">
                    <Link to={`/project/${project.project_id}`}>
                        <div className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-300">
                            {project.title}
                        </div>
                    </Link>
                    <div className="text-base text-gray-600">{`Description: ${project.description}`}</div>
                    <div className="text-base text-gray-600">{`Field: ${project.project_type}`}</div>
                    <div className="text-base text-gray-600">{`Project Owner: ${projectOwnerName}`}</div>
                    <div className="text-base text-gray-600">{`Theme: ${project.theme}`}</div>
                </div>
            </div>
            {yourSkillsInDemand.length > 0 && (
                <div className="bg-blue-500 text-white px-2 py-1 rounded-b-lg">
                    Your skills in Demand:
                    {yourSkillsInDemand.map(skill => (
                        <span
                            key={skill.name}
                            className="inline-block px-2 ml-2 mr-2"
                        >
          {skill.name}
        </span>
                    ))}
                </div>
            )}
        </div>

    );


};

export default ProjectCard;
