import ProjectCard from "./ProjectCard";
import { useState, useEffect } from 'react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterType, setFilterType] = useState('');


    // Fetch projects from the backend
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/project')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    // Filter projects by project type
    useEffect(() => {
        // If no filter is selected, show all projects
        if (filterType === '') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.project_type === filterType));
        }
    }, [projects, filterType]);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    }

    const projectTypes = [...new Set(projects.map(project => project.project_type))];

    return (
        <div>
            <label htmlFor="project-type-filter">Filter by project type:</label>
            <select id="project-type-filter" value={filterType} onChange={handleFilterChange}>
                <option value="">All</option>
                {projectTypes.map(projectType => (
                    <option key={projectType} value={projectType}>{projectType}</option>
                ))}
            </select>

            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}

export default ProjectList;
