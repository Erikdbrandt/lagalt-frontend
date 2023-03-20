import { useState, useEffect } from 'react';
import { fetchProjects } from '../api/projects';
import keycloak from '../keycloak';

function useProjectList() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchProjects();
            setProjects(data);
        };

        if (keycloak.hasRealmRole('offline_access')) {
            loadProjects();
        }
    }, []);

    useEffect(() => {
        if (filterType === '') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter((project) => project.project_type === filterType));
        }
    }, [projects, filterType]);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const projectTypes = [...new Set(projects.map((project) => project.project_type))];

    return { filteredProjects, projectTypes, handleFilterChange, filterType };
}

export default useProjectList;
