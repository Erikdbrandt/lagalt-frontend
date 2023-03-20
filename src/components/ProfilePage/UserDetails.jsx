import React, { useState } from 'react';

const UserDetails = ({ name, setName, email, setEmail, description, setDescription }) => {
    const [previewInfo, setPreviewInfo] = useState({ name: '', email: '', description: '' });
    const [tempInfo, setTempInfo] = useState({ name: '', email: '', description: '' });

    const saveInfo = () => {
        setPreviewInfo(tempInfo);
        setName('');
        setEmail('');
        setDescription('');
        setTempInfo({ name: '', email: '', description: '' });
    };

    return (
        <div className="flex">
            <div className="w-1/2">
                <label className="block mb-2">Name:</label>
                <input
                    type="text"
                    value={tempInfo.name}
                    onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
                    className="w-full border border-gray-300 p-2 mb-4 rounded-md"
                />
                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    value={tempInfo.email}
                    onChange={(e) => setTempInfo({ ...tempInfo, email: e.target.value })}
                    className="w-full border border-gray-300 p-2 mb-4 rounded-md"
                />
                <label className="block mb-2">About me:</label>
                <textarea
                    value={tempInfo.description}
                    onChange={(e) => setTempInfo({ ...tempInfo, description: e.target.value })}
                    className="w-full border border-gray-300 p-2 mb-2 rounded-md"
                />
                <button
                    onClick={saveInfo}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Save
                </button>
            </div>
            <div className="w-1/2 ml-8">
                <h2 className="text-xl font-semibold mb-4">My Personal Info</h2>
                <div>
                    <p><strong>Name:</strong> {previewInfo.name}</p>
                    <p><strong>Email:</strong> {previewInfo.email}</p>
                    <p><strong>About me:</strong></p>
                    <p>{previewInfo.description}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
