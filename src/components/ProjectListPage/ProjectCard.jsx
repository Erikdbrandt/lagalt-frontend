import {Link} from "react-router-dom";
import {useUser} from "../context/UserContext"
import {useEffect, useState} from "react"

const ProjectCard = ({project}) => {

    const {user} = useUser();

    const [matchedSkills, setMatched] = useState(false);


    useEffect(() => {

            console.log(project)
            if (user.skills) {
                const matched = user.skills.some(skill => {
                    const isMatched = project.skills.includes(skill);
                    return isMatched;
                });

              //  console.log(`Matched: ${matched}`);
                setMatched(matched);
            }

        }
        , [])


    return (
        <div className="border-2 bg-white p-5 flex">
            <div className="card_left flex-none mr-5">
                <img src="https://picsum.photos/200/300" alt="projectimg" className="w-20 h-20 rounded"/>
            </div>
            <div className="card_right flex-grow">


                <Link to={`/project/${project.project_id}`}>
                    <div className="old-reddit-font text-lg font-bold text-blue-400">{project.title}</div>
                </Link>
                <div className="old-reddit-font text-base">{`Description: ${project.description}`}</div>
                <div className="old-reddit-font text-base">{`Field: ${project.project_type}`}</div>
                <div className="old-reddit-font text-base">{`Project owner ID: ${project.owner}`}</div>
                <div className="old-reddit-font text-base">{`Status: ${matchedSkills}`}</div>


                <div className="old-reddit-font text-base">{`Theme: ${project.theme}`}</div>


            </div>
        </div>

    )
}

export default ProjectCard;
