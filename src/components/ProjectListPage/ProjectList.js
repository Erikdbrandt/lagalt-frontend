import ProjectCard from "./ProjectCard";
import { useState, useEffect } from 'react';

const ProjectList = () => {

  /*  const projects = [

        {id: 1,
            name: 'Project 1',
            image: 'https://picsum.photos/200/300',
            field: 'Web Development',
            skill: ['React', 'Node', 'Express'],
            theme: 'E-commerce'},
        {id: 2,
            name: 'Project 2',
            image: 'https://picsum.photos/200/300',
            field: 'Web Development',
            skill: ['React', 'Node', 'Express'],
            theme: 'E-commerce'},
        {id: 3,
            name: 'Project 3',
            image: 'https://picsum.photos/200/300',
            field: 'Web Development',
            skill: ['React', 'Node', 'Express'],
            theme: 'E-commerce'},
        {id: 4,
            name: 'Project 4',
            image: 'https://picsum.photos/200/300',
            field: 'Web Development',
            skill: ['React', 'Node', 'Express'],
            theme: 'E-commerce'},
        ]
*/

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/project')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    console.log(projects)

    return (
        <div>

            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}

export default ProjectList;