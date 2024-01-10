import axios from "axios";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";

import { useEffect, useState } from "react";

const token = "6245ea4533c7db7f0b9d99f9a01eb6df32664881";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [note, setNote] = useState({text: "Nothing chosen!"});

  const fetchNotes = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/v1/note/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const editNote = async (note) => { 
    await axios
      .put(
        `http://127.0.0.1:8000/api/v1/note/${note.id}/`,
        {
          text: note.text,
          category_text: note.category_text,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        fetchNotes();
        setNote(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const deleteNote = async (note) => { 
    await axios
      .delete(
        `http://127.0.0.1:8000/api/v1/note/${note.id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        fetchNotes();
        setNote({ text: "Nothing chosen!" });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const createNote = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/api/v1/note/",
        {
          text: "New note",
          category_text: "New note",
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        fetchNotes();
        setNote(response.data);
        setSelectedNoteId(response.data.id);
      })
      .catch((error) => {
        alert(error.message);
      });
  }


  useEffect(() => {
    fetchNotes();
  }, []);


  const handleChooseNote = (selectedNote) => {
    setSelectedNoteId(selectedNote.id);
    setNote(selectedNote);
  };

  const handleSaveChanges = (editedNote) => {
    setNote(editedNote);
    editNote(editedNote);
  }

  const handleDeleteNote = (editedNote) => { 
    deleteNote(editedNote);
  }

  const handleAddNewNote = () => { 
    createNote();
  }

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={handleChooseNote}
        onAddNewNote={handleAddNewNote}
      />
      <Content
        note={note}
        onSaveChanges={handleSaveChanges}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

export default App;
