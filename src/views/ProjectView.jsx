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

            {project ? (
                <div className="p-8 ">
                    <h1 className="old-reddit-font text-4xl font-bold text-blue-400">{project.title}</h1>
                    <p>{project.description}</p>

                    <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4">Apply</button>
                </div>
            ) : (
                <p>Loading project data...</p>
            )}
        </div>
    );
};

export default ProjectView;