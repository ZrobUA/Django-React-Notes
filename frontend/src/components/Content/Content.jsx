import React, { useState, useEffect } from "react";


function Content(props) {
    const [editedNote, setEditedNote] = useState(props.note);

    useEffect(() => {
        setEditedNote(props.note);
    }, [props.note]);

    const handleNoteChange = (event) => {
        const text = event.target.value
        if (text !== editedNote.text) {
            setEditedNote((prevNote) => ({
                ...prevNote,
                text: text,
            }));
        }
    };

    const handleSave = () => {
        let category = prompt("Category", editedNote.category_text);

        if (category !== null) {
            setEditedNote((prevNote) => {
                const updatedNote = { ...prevNote, category_text: category };
                props.onSaveChanges(updatedNote);
                return updatedNote;
            });
        }
    };

    const handleDeleteNote = () => { 
        props.onDeleteNote(editedNote);
    }


    return (
        <div className="Content">
            <textarea value={editedNote.text} onChange={handleNoteChange} />
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={handleDeleteNote}>Удалить</button>
        </div>
    );
}

export default Content;
