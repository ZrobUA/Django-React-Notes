import SearchButton from "./SearchButton";
import { useState } from "react";


function Search(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [inputActive, setInputActive] = useState(false);

    const handleSearch = () => {
        props.onSearch(searchQuery);
        setSearchQuery("");
        setInputActive(false);
    };

    const handleKeyDown = (e) => { 
        if (e.key === "Enter") {
            handleSearch();
            setSearchQuery("");
            setInputActive(false);
        }
    }

    return (
        <div className="Search">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                disabled={inputActive}
            />
            <SearchButton onSearch={handleSearch} />
        </div>
    );
}

export default Search;
