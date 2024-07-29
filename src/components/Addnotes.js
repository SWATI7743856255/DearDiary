import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";

function Addnotes() {
  const { addNote } = useContext(NoteContext);
  const [note, setNotes] = useState({ title: "", description: "" });
  const { showAlert } = useContext(AlertContext);


  const handleClick = (event) => {
    event.preventDefault(); 
    addNote(note.title, note.description);
    setNotes({title: "", description: ""})
    showAlert("Note added successfully", "success");

    
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Start your journey today</h2>
        <form className="my-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title"  
              value={note.title}
              onChange={onChange}
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              value={note.description}
              onChange={onChange}
            />
            <label htmlFor="description">Write Your Thoughts</label>
          </div>
          
          <button
            type="Add"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length<5|| note.description.length<5}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnotes;
