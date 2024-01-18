import React, { useState } from "react";

function CategoryDropdownMenu(props) {
    const categories = props.categories;
    const selectedCategory = props.selectedCategory
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectCategory = (category) => {
        setIsOpen(false);
        props.onChooseCategory(category);
    };

    const handleShowAllNotes = () => { 
        setIsOpen(false);
        props.onShowAllNotes();
    }

    return (
        <div className="CategoryDropdownMenu">
            <button className="dropdown-toggle" onClick={handleToggleMenu}>
                {selectedCategory ? selectedCategory.name : "Select an option"}
            </button>
            {isOpen && (
                <ul className="CategoryDropdownMenu-List">
                    <li onClick={() => handleShowAllNotes()}>Show all</li>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            onClick={() => handleSelectCategory(category)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoryDropdownMenu;
