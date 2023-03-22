import React, {useState} from "react";
import {createSkill} from "../../api/skills"

const AddSkillPopup = ({onAddSkill, onCancel}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAddSkill = async () => {
        const skillToCreate = {
            name: name,
            description: description
        };

        console.log(skillToCreate)
        const [error, newSkill] = await createSkill(skillToCreate);

        if (error) {
            console.log(error);
            return;
        }

        console.log("New skill added:", newSkill);
        onAddSkill(newSkill);
    };

    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

                <div
                    className="inline-block align-middle bg-white rounded-lg m-2 px-4 pt-2 pb-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-1 sm:align-middle sm:max-w-2xl sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "25rem",
                        maxHeight: "17rem",
                        overflowY: "auto",
                    }}
                >

                <div className="sm:flex sm:items-start">
                        <div
                            className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            id="modal-headline"
                        >
                            <h2 className="text-lg font-medium text-gray-900 mb-1">
                                Add new skill:
                            </h2>
                            <div className="mt-1">
                                <label className="block text-gray-700 font-bold mb-1">
                                    Name:
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </label>
                                <label className="block text-gray-700 font-bold mb-1">
                                    Description:
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="3"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    ></textarea>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleAddSkill}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSkillPopup;

