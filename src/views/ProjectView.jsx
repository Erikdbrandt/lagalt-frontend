import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectView = () => {
    const { id } = useParams(); // extract project ID from URL path
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Fetch project data from API using the project ID
        fetch(`http://localhost:8080/api/v1/project/${id}`)
            .then((response) => response.json())
            .then((data) => setProject(data))
            .catch((error) => console.error(error));
    }, [id]);

    return (
        <div>
            <div className="bg-blue-100 h-14 flex items-center p-2 ">
                project view
            </div>
            {project ? (
                <div>
                    <h1 className="old-reddit-font text-lg font-bold text-blue-400">{project.title}</h1>
                    <p>{project.description}</p>
                    {/* Display other project data */}
                </div>
            ) : (
                <p>Loading project data...</p>
            )}
        </div>
    );
};

export default ProjectView;