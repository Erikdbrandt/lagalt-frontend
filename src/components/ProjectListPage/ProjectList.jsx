import useProjectList from "../../hooks/useProjectList"
import ProjectCard from './ProjectCard';
import keycloak from "../../keycloak"

function ProjectList() {
    const { filteredProjects, projectTypes, handleFilterChange, filterType } = useProjectList();

    if (!keycloak.authenticated) {
        return <div>You do not have permission to view projects.</div>;
    }

    return (
        <div>
            <h2>Project List</h2>

            <label htmlFor="project-type-filter">Filter by project type:</label>
            <select id="project-type-filter" value={filterType} onChange={handleFilterChange}>
                <option value="">All</option>
                {projectTypes.map((projectType) => (
                    <option key={projectType} value={projectType}>
                        {projectType}
                    </option>
                ))}
            </select>

            <ul>
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;
