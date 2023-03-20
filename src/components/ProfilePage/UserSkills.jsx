import React, { useEffect, useState } from 'react';

const UserSkills = ({ skills, setSkills }) => {
    const [previewSkills, setPreviewSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');

    const handleSkillsChange = (e) => {
        setCurrentSkill(e.target.value);
    };

    const addSkill = () => {
        if (currentSkill.trim() !== '') {
            setSkills([...skills, currentSkill]);
            setCurrentSkill('');
        }
    };

    useEffect(() => {
        const hardcodedSkills = ['HTML', 'CSS', 'JavaScript'];
        setPreviewSkills([...hardcodedSkills, ...skills]);
    }, [skills]);

    return (
        <div className="flex">
            <div className="w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                <div className="mb-2">
                    <input
                        type="text"
                        value={currentSkill}
                        onChange={handleSkillsChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    onClick={addSkill}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
                >
                    Add Skill
                </button>
            </div>
            <div className="w-1/2 ml-8">
                <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
                <ul>
                    {previewSkills.map((skill, index) => (
                        <li key={index} className="mb-2">
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserSkills;
