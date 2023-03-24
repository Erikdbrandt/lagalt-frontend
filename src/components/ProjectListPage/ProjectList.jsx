import ProjectCard from "./ProjectCard";
import {useState, useEffect} from 'react';
import keycloak from "../../keycloak";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {getAllProjects} from "../../api/projects"
import {getAllUsers} from "../../api/userService"

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [allUsers, setUsers] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterType, setFilterType] = useState('');

    // Fetch projects from the backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {

                const projects = await getAllProjects()

                setProjects(projects);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllUsers = async () => {
            try {
                const users = await getAllUsers()
                setUsers(users);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllUsers();

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
        <div className="py-5">
            <label htmlFor="project-type-filter">Filter by project type:</label>
            <select id="project-type-filter" value={filterType} onChange={handleFilterChange}>
                <option value="">All</option>
                {projectTypes.map(projectType => (
                    <option key={projectType} value={projectType}>{projectType}</option>
                ))}
            </select>
        </div>

            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} allUsers={allUsers} />
            ))}
            {keycloak.authenticated && (
                <div className="mt-5 flex items-center justify-center ">
                    <Link to="/new-project"><FontAwesomeIcon icon={faPlus} size="3x" color="#a9a9a9"/></Link>
                </div>)}
        </div>
    );
}

export default ProjectList;
