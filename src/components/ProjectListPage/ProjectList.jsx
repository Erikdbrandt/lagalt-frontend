import ProjectCard from "./ProjectCard";
import { useState, useEffect } from 'react';
import axios from 'axios';
import keycloak from "../../keycloak";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterType, setFilterType] = useState('');

    // Fetch projects from the backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/project', {
                    // headers: {
                    //     Authorization: `Bearer ${keycloak.token}`
                    // }
                });
                setProjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProjects();
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

    // This function is called when the user selects a new filter type
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    }

    // Get a list of all project types
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
