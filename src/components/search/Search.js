import { useState } from "react";

const Search = ({ projects }) => {
    const [searchField, setSearchField] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);

    const handleChange = (e) => {
        setSearchField(e.target.value);
        setFilteredProjects(
            projects.filter((project) =>
                project.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <section>
            <div>
                <input
                    type="search"
                    placeholder="Search for a project"
                    value={searchField}
                    onChange={handleChange}
                />
            </div>
            <div>
                {filteredProjects.map((project) => (
                    <div key={project.id}>{project.title}</div>
                ))}
            </div>
        </section>
    );
};

export default Search;
