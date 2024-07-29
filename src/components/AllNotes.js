import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AllNoteItem from "./AllNoteItem";
import Addnotes from "./Addnotes";
import AlertContext from "../context/alert/AlertContext";
import {useNavigate } from "react-router-dom";



function AllNotes() {
  const { notes, fetchNote,editNote } = useContext(NoteContext);
  const [note, setNotes] = useState({ id: "", etitle: "", edescription: "" });
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/Login");
    } else {
      fetchNote();
    }
  }, [navigate, fetchNote]);


  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentnote) => {
    if (ref.current) {
      ref.current.click(); // This should programmatically trigger the modal
    }
    setNotes({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
    });

  };

  const handleClick = (event) => {
    event.preventDefault();
    editNote(note.id,note.etitle, note.edescription);
    refclose.current.click();
    showAlert("Note updated successfully", "success");

  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnotes />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit the Thought
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Title"
                    value={note.etitle}
                    onChange={onChange}
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Description"
                    value={note.edescription}
                    onChange={onChange}
                  />
                  <label htmlFor="description">Write Your Thoughts</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etitle.length<5|| note.edescription.length<5}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your smriti</h2>
        <div className="containner">
          {notes.length===0 &&'Nothinng to dispaly. Add your first thought.'}
        </div>
        {notes.map((note) => (
          <AllNoteItem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
}

export default AllNotes;
