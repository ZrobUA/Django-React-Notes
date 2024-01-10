import React from "react";

function NoteItem(props) {
  const note = props.note;
  const isSelected = props.isSelected;

  const truncatedText =
    note.text.length > 15 ? note.text.slice(0, 15) + "..." : note.text;

  const handleChooseNote = () => {
    props.onNoteSelect(note);
  };

  return (
    <li
      className={`NotesList-NoteItem ${isSelected ? "selected" : ""}`}
      onClick={handleChooseNote}
    >
      <div>
        <h2>{truncatedText}</h2>
      </div>
    </li>
  );
}

export default NoteItem;
