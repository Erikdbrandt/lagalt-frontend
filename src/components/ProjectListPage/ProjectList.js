import ProjectCard from "./ProjectCard";
import { useState, useEffect } from 'react';

const ProjectList = () => {


    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/project')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    return (
        <div>

            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}

export default ProjectList;