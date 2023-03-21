import React, { useState } from "react";

const PopUp = ({ handlePopupSubmit }) => {
    const [visibility, setVisibility] = useState("REGULAR");

    const handleStatusChange = (e) => {
        setVisibility(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePopupSubmit(visibility);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg">
                <h2 className="text-lg font-semibold mb-2">
                    Welcome, new user!
                </h2>
                <p className="mb-4">
                    Do you want to be hidden or visible to other users?
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="visibility"
                            id="visible"
                            value="REGULAR"
                            className="mr-2"
                            checked={visibility === "REGULAR"}
                            onChange={handleStatusChange}
                        />
                        <label htmlFor="visible">Regular</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="visibility"
                            id="hidden"
                            value="HIDDEN"
                            className="mr-2"
                            checked={visibility === "HIDDEN"}
                            onChange={handleStatusChange}
                        />
                        <label htmlFor="hidden">Hidden</label>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopUp;
