import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"

const ProjectInfo = () => {
    const {id} = useParams(); // extract project ID from URL path
    const [project, setProject] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleApplyClick = () => {
        setShowPopup(true);
    };

    const handleOkClick = () => {
        setShowPopup(false);
        // Add logic here to apply for the project
    };

    const handleCancelClick = () => {
        setShowPopup(false);
    };

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
                    <h1 className="old-reddit-font text-4xl font-bold text-blue-400 mb-4">{project.title}</h1>
                    <p>{project.description}</p>
                    <div
                        className="old-reddit-font text-base"> {"Participants:"} {project.participants.join(", ")}</div>
                    <div className="old-reddit-font text-base">{`Status: ${project.project_status}`}</div>

                    <button onClick={() => setShowPopup(true)} className="bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4">Apply</button>
                </div>
            ) : (
                <p>Loading project data...</p>
            )}

            {showPopup ? (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5">
                    <div className="bg-white w-1/3 h-1/3 rounded-md flex flex-col justify-center items-center p-1">
                        <p className="text-2xl p-5">Your information will be shared with the owner.</p>
                        <p className="text-2xl p-5">Please give a motivation to apply to the project</p>

                        <textarea className="border-2 border-gray-300 p-2 rounded-md w-3/4 h-1/3" placeholder="Type your motivation here..."></textarea>

                        <div className="flex justify-center items-center mt-4">
                            <button onClick={handleOkClick} className="bg-blue-400 text-white font-bold py-2 px-4 rounded mr-4">OK</button>
                            <button onClick={handleCancelClick} className="bg-blue-400 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
                ) : null}

        </div>
    );
};

export default ProjectInfo;