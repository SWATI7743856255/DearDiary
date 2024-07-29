import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";

function AllNoteItem(props) {
  const { note,updateNote } = props;

  const { deleteNote } = useContext(NoteContext);
  const { showAlert } = useContext(AlertContext);

  const handledelete=()=>{
    deleteNote(note._id)
    showAlert("Note deleted successfully", "success");


  }
  const handleUpdateNote=()=>{
    
    updateNote(note);

  }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2"onClick={handledelete}></i>
            <i className="fa-solid fa-pen-to-square mx-2"onClick={handleUpdateNote}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default AllNoteItem;
