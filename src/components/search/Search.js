/*
import { useState } from "react";
import ProjectCard from "../ProjectListPage/ProjectCard";

const Search = ({ projects, setFilteredProjects }) => {
    const [searchField, setSearchField] = useState("");
  //  const [filteredProjects, setFilteredProjects] = useState([]);

    const handleChange = (e) => {
        setSearchField(e.target.value);
        setFilteredProjects(
            projects.filter((project) =>
                project.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    const handleClear = () => {
        setSearchField("");
        setFilteredProjects([]);
    };

    return (
        <section>
            <div className="flex items-center">
                <input
                    type="search"
                    placeholder="Search for a project"
                    value={searchField}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                {searchField && (
                    <button className="ml-2" onClick={handleClear}>
                        Clear
                    </button>
                )}
            </div>
         {/!*   <div>
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>*!/}
        </section>
    );
};

export default Search;
*/

import {useState} from 'react';

const Search = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="py-5">

            <div className="inline-block">
                <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search by title"
                    className="bg-white border border-gray-400 rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 transition-colors duration-300"
                />
            </div>
        </div>
    );
};

export default Search;
