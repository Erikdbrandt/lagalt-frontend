import { useState, useEffect } from 'react';
import keycloak from "../../keycloak";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Search from "../search/Search";
import { getAllProjects } from "../../api/projects"
import { getAllUsers } from "../../api/userService"
import { getAllSkills } from "../../api/skills"

import ProjectCard from "./ProjectCard";

const ProjectList = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [allUsers, setUsers] = useState([]);
    const [allSkills, setSkills] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch projects from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const projects = await getAllProjects();
                const users = await getAllUsers();
                const [error, skills] = await getAllSkills();


                setProjects(projects);
                setUsers(users);
                setSkills(skills);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Filter projects by project type and title
    useEffect(() => {
        const filteredByProjectType = filterType === ''
            ? projects
            : projects.filter(project => project.project_type === filterType);

        const filteredByTitle = searchQuery === ''
            ? filteredByProjectType
            : filteredByProjectType.filter(project => project.title.toLowerCase().includes(searchQuery.toLowerCase()));

        setFilteredProjects(filteredByTitle);
    }, [projects, filterType, searchQuery]);

    // This function is called when the user selects a new filter type
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    // This function is called when the user enters a search query
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Get a list of all project types
    const projectTypes = [...new Set(projects.map(project => project.project_type))];

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={""}>


                    <div className="flex justify-between">
                        <div className="py-5">
                            <label htmlFor="project-type-filter" className="block font-medium text-gray-700 mb-2">Filter by project type:</label>
                            <div className="inline-block">
                                <select id="project-type-filter" value={filterType} onChange={handleFilterChange} className="bg-white border border-gray-400 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="">All</option>
                                    {projectTypes.map(projectType => (
                                        <option key={projectType} value={projectType}>{projectType}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="py-5">
                            <Search onSearch={handleSearch} />
                        </div>
                    </div>



                    {filteredProjects.map((project) => (
                        <div className={"py-5"}>
                        <ProjectCard key={project.id} project={project} allUsers={allUsers} allSkills={allSkills}/>
                        </div>


                    ))}
                    {keycloak.authenticated && (
                        <div className="mt-5 flex items-center justify-center ">
                            <Link to="/new-project"><FontAwesomeIcon icon={faPlus} size="3x" color="#a9a9a9"/></Link>
                        </div>)}
                </div>
            )}
        </div>
    );
}

export default ProjectList;
