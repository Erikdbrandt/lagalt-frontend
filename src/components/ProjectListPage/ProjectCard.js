const ProjectCard = ({project}) => {

    return (
        <div className="border-2 bg-white p-5 flex">
            <div className="card_left flex-none mr-5">
                <img src="https://picsum.photos/200/300" alt="projectimg" className="w-20 h-20 rounded"/>
            </div>
            <div className="card_right flex-grow">

                <div className="old-reddit-font text-lg font-bold text-blue-400">{project.title}</div>
                <div className="old-reddit-font text-base">{`Description: ${project.description}`}</div>
                <div className="old-reddit-font text-base">{`Field: ${project.project_type}`}</div>
                <div className="old-reddit-font text-base">{`project owner ID: ${project.owner}`}</div>
                <div className="old-reddit-font text-base">{`Field: ${project.project_status}`}</div>




                <span className="old-reddit-font text-base"> {"Participants:"} {project.participants.join(", ")}</span>




                <div className="old-reddit-font text-base">{`Theme: ${project.theme}`}</div>
            </div>
        </div>
    )
}

export default ProjectCard;
