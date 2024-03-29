import axios from "axios";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

import { useEffect, useState } from "react";


function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([{name: "Categories"}]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [note, setNote] = useState({ text: "Nothing chosen!" });
  const [selectedCategory, setSelectedCategory] = useState({ name: "Categories",});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);

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
        setShowEditButtons(false);
        setNote({ text: "Nothing chosen!" });
        fetchCategories();
        setSelectedCategory({
          name: "Categories",
        });
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
        setShowEditButtons(true);
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
      setNote({text: 'Nothing chosen!'});
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
      setNote({ text: "Firstly Login!" });
      setSelectedNoteId(null);
      setSelectedCategory({ name: "Categories" });
      setShowEditButtons(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchCategories = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/v1/category/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setCategories([]);
        alert(error.message);
      });
  }

  const fetchNotesByCategory = async (category) => {
    await axios
      .get(`http://127.0.0.1:8000/api/v1/category/${category.id}/notes/`, {
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
  }

  const fetchNotesBySearch = async (searchQuery) => {
    await axios
      .get(`http://127.0.0.1:8000/api/v1/notes/${searchQuery}/ `, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNotes(response.data);
        setNote({ text: "Nothing chosen!" });
        
        if (response.data.length === 0) {
          setNote({ text: "Nothing find!" });
        }
      })
      .catch((error) => {
        setNotes([]);
        alert(error.message);
      });
  }



  useEffect(() => {
    // localStorage.clear();
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchNotes();
      fetchCategories();
    }
    // eslint-disable-next-line
  }, [token]);


  function handleChooseNote(selectedNote) {
    setShowEditButtons(true);
    setSelectedNoteId(selectedNote.id);
    setNote(selectedNote);
  }

  const handleSaveChanges = (editedNote) => {
    setNote(editedNote);
    editNote(editedNote);
    fetchCategories();
  };

  const handleDeleteNote = (editedNote) => {
    deleteNote(editedNote);
  };

  const handleAddNewNote = () => {
    createNote();
    setSelectedCategory({
      name: "Categories",
    });
  };

  const handleSubmitAuthForm = (Auth) => {
    login(Auth);
  };

  const handleLogout = () => {
    logout();
  };

  const handleChooseCategory = (category) => { 
    setSelectedCategory(category);
    fetchNotesByCategory(category);
  }

  const handleShowAllNotes = () => { 
    setSelectedCategory({
      name: "Categories",
    });
    fetchNotes();
  }

  const handleSearch = (searchQuery) => { 
    fetchNotesBySearch(searchQuery);
  }

  return (
    <div className="App">
      <Header
        onSubmitSaveForm={handleSubmitAuthForm}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      <Sidebar
        notes={notes}
        categories={categories}
        selectedNoteId={selectedNoteId}
        selectedCategory={selectedCategory}
        onNoteSelect={handleChooseNote}
        onAddNewNote={handleAddNewNote}
        onChooseCategory={handleChooseCategory}
        onShowAllNotes={handleShowAllNotes}
      />
      <Content
        note={note}
        showEditButtons={showEditButtons}
        onSaveChanges={handleSaveChanges}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

export default App;
