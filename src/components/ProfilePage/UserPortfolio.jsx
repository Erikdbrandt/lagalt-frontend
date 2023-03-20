import React, { useState, useEffect } from 'react';

const UserPortfolio = ({ portfolio, setPortfolio }) => {
    const [tempPortfolio, setTempPortfolio] = useState({ title: '', link: '' });


    const handlePortfolioItemChange = (e, field) => {
        setTempPortfolio({ ...tempPortfolio, [field]: e.target.value });
    };

    const addPortfolioItem = () => {
        setPortfolio([...portfolio, tempPortfolio]);
        setTempPortfolio({ title: '', link: '' });
    };

    useEffect(() => {
        // Add hardcoded projects
        setPortfolio([
            {
                title: 'Project 1',
                link: 'https://example.com/project1',
            },
            {
                title: 'Project 2',
                link: 'https://example.com/project2',
            },
        ]);
    }, []);

    return (
        <div className="flex">
            <div className="w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Add Portfolio Item</h2>
                <div className="mb-4">
                    <label className="block mb-2">Title:</label>
                    <input
                        type="text"
                        value={tempPortfolio.title}
                        onChange={(e) => handlePortfolioItemChange(e, 'title')}
                        className="w-full border border-gray-300 p-2 mb-2 rounded-md"
                    />
                    <label className="block mb-2">Link:</label>
                    <input
                        type="text"
                        value={tempPortfolio.link}
                        onChange={(e) => handlePortfolioItemChange(e, 'link')}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    onClick={addPortfolioItem}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                >
                    Add Portfolio Item
                </button>
            </div>
            <div className="w-1/2 ml-8">
                <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
                {portfolio.map((item, index) => (
                    <div key={index} className="mb-4">
                        <p>
                            <strong>Title:</strong> {item.title}
                        </p>
                        <p>
                            <strong>Link:</strong> {item.link}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPortfolio;
