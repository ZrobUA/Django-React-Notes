import "./Sidebar.css";
import NotesList from "./NotesList";
import CreateNoteButton from "./CreateNoteButton";


function Sidebar(props) {
  const notes = props.notes;
  const selectedNoteId = props.selectedNoteId;

  const handleChooseNote = (note) => {
    props.onNoteSelect(note);
  };

  const handleAddNewNote = () => {
    props.onAddNewNote();
  };

  return (
    <div className="Sidebar">
      <CreateNoteButton onAddNewNote={handleAddNewNote} />
      <NotesList
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={handleChooseNote}
      />
    </div>
  );
}

export default Sidebar;
