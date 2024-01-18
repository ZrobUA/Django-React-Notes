import React from "react";
import CreateNoteButton from "./CreateNoteButton";
import CategoryDropdownMenu from "./CategoryDropdownMenu";
import NotesList from "./NotesList";

function Sidebar(props) {
  const {
    notes,
    selectedNoteId,
    selectedCategory,
    categories,
    onNoteSelect,
    onAddNewNote,
    onChooseCategory,
    onShowAllNotes,
  } = props;

  return (
    <div className="Sidebar">
      <div className="Sidebar-Header">
        <CreateNoteButton onAddNewNote={onAddNewNote} />
        <CategoryDropdownMenu
          categories={categories}
          selectedCategory={selectedCategory}
          onChooseCategory={onChooseCategory}
          onShowAllNotes={onShowAllNotes}
        />
      </div>
      <NotesList
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={onNoteSelect}
      />
    </div>
  );
}

export default Sidebar;
