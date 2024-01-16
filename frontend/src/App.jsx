import axios from "axios";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

import { useEffect, useState } from "react";


function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [note, setNote] = useState({ text: "Nothing chosen!" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("authToken", token);
  };

  const clearTokenFromLocalStorage = () => {
    localStorage.removeItem("authToken");
  };



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
        setNotes([]);
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
  };

  const deleteNote = async (note) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/v1/note/${note.id}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        fetchNotes();
        setNote({ text: "Nothing chosen!" });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
  };

  const login = async (Auth) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/token/login/",
        {
          username: Auth.username,
          password: Auth.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const authToken = response.data.auth_token;
      saveTokenToLocalStorage(authToken);
      setToken(authToken);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        alert('Invalid login or password');
      } else {
        alert(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/token/logout/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      setToken("");
      setIsAuthenticated(false);
      clearTokenFromLocalStorage();
      setNotes([]);
    } catch (error) {
      alert(error.message);
    }
  };



  useEffect(() => {
    // localStorage.clear();
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchNotes();
    }
    // eslint-disable-next-line
  }, [token]);


  function handleChooseNote(selectedNote) {
    setSelectedNoteId(selectedNote.id);
    setNote(selectedNote);
  }

  const handleSaveChanges = (editedNote) => {
    setNote(editedNote);
    editNote(editedNote);
  };

  const handleDeleteNote = (editedNote) => {
    deleteNote(editedNote);
  };

  const handleAddNewNote = () => {
    createNote();
  };

  const handleSubmitAuthForm = (Auth) => {
    login(Auth);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="App">
      <Header
        onSubmitSaveForm={handleSubmitAuthForm}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
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
