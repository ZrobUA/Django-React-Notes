import NoteItem from "./NoteItem";

function NotesList(props) {
  const notes = props.notes;
  const selectedNoteId = props.selectedNoteId;

  const handleChooseNote = (note) => {
    props.onNoteSelect(note);
  };

  return (
    <ul className="Sidebar-NotesList">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onNoteSelect={handleChooseNote}
          isSelected={note.id === selectedNoteId}
        />
      ))}
    </ul>
  );
}

export default NotesList;
