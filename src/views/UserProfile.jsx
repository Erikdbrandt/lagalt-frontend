import React, { useState } from 'react';
import UserDetails from '../components/ProfilePage/UserDetails';
import UserSkills from '../components/ProfilePage/UserSkills';
import UserPortfolio from '../components/ProfilePage/UserPortfolio';

const UserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [hidden, setHidden] = useState(false);

    const toggleHiddenMode = () => {
        setHidden(!hidden);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <UserDetails
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                description={description}
                setDescription={setDescription}
            />
            <div className="mt-8">
                <UserSkills skills={skills} setSkills={setSkills} />
            </div>
            <div className="mt-8">
                <UserPortfolio portfolio={portfolio} setPortfolio={setPortfolio} />
            </div>

            <label className="fixed bottom-0 right-0 items-center mb-4 mr-4 text-lg p-5">
                <input
                    type="checkbox"
                    checked={hidden}
                    onChange={toggleHiddenMode}
                    className="mr-2 h-5 w-5"
                />
                Hidden mode:
            </label>
        </div>
    );
};

export default UserProfile;
