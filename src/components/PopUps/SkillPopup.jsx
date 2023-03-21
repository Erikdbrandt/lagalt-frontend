import React, { useEffect, useState } from "react";
import {getAllSkills} from "../../api/skills"

const SkillPopup = () => {
    const [allSkills, setAllSkills] = useState([]);

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


    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Select your skills:</h2>
                {allSkills.map((skill) => (
                    <div >
                        <input
                            type="checkbox"
                            id={skill.skill_id}
                            name={skill.name}


                        />
                        <label htmlFor={skill.id}>{skill.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillPopup;