import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../api/skills";
import AddSkillPopup from "./AddSkillPopup"


const SkillPopup = ({ onSaveSkills, onCancel }) => {
    const [allSkills, setAllSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [showAddSkillPopup, setShowAddSkillPopup] = useState(false);


    useEffect(() => {
        async function fetchSkills() {
            const [error, skills] = await getAllSkills();

            if (error) {
                console.log(error);
                return;
            }

            setAllSkills(skills);
        }


        fetchSkills();
    }, []);

    const handleCheckboxChange = (event) => {
        const skillId = event.target.id;
        const skillName = event.target.name;
        const checked = event.target.checked;

        if (checked) {
            setSelectedSkills([...selectedSkills, { skill_id: skillId, name: skillName }]);
        } else {
            setSelectedSkills(selectedSkills.filter((skill) => skill.skill_id !== skillId));
        }
    };

    const handleSave = () => {

        onSaveSkills(selectedSkills);
    };

    const handleCancel = () => {
        onCancel();
    }

    const handleAddSkill = (newSkill) => {



        setAllSkills([...allSkills, newSkill]);
        setShowAddSkillPopup(false);
    };

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
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full max-h-96 "
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="sm:flex sm:items-start">
                        <div
                            className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            id="modal-headline"
                        >
                            <h2 className="text-lg font-medium text-gray-900 mb-3">
                                Select your skills:
                            </h2>
                            {allSkills.map((skill) => (
                                <div key={skill.skill_id}>
                                    <label className="inline-flex items-center mt-3">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            id={skill.skill_id}
                                            name={skill.name}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="ml-2 text-gray-700">{skill.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {showAddSkillPopup ? (
                        <AddSkillPopup onAddSkill={handleAddSkill} onCancel={() => setShowAddSkillPopup(false)} />
                    ) : (
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-4"
                            onClick={() => setShowAddSkillPopup(true)}
                        >
                            Add Skill
                        </button>
                    )}

                    <div className="mt-2 sm:mt-2 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"

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

export default SkillPopup;
