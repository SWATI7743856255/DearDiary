import { useState } from "react";
import NoteContext from "./notes/NoteContext";


const host="http://localhost:5000"

const NoteState = (props) => {
  const inotes=[]

  const [notes, setnotes] = useState(inotes);


  //Fetch all notes from database
  const fetchNote=async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const jason=await response.json();
    setnotes(jason);
  }
  
  //ADD a note
  const addNote= async (title,description)=>{
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title: title,description:description }),
    });
    const jason=await response.json();
    setnotes(notes.concat(jason));

  }


/*
  //edit the note
  const editNote=async(id,title,description)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title: title,description:description }),
    });

    const json = await response.json();
    console.log(json);


    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id===id) {
        element.title=title;
        element.description=description;
        
      }
      
    }
    
    
  }
*/

  // Edit the note
  const editNote = async (id, title, description) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description }),
      });

      const json = await response.json();

      const updatedNotes = notes.map(note => note._id === id ? { ...note, title, description } : note);
      setnotes(updatedNotes);
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };



  // delete the note
  //API CALL
  const deleteNote=async(id)=>{
    //const newnote=notes.filter((note)=>{return note._id!==id})
    

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    //const jason=await response.json();
    if (response.ok) {
      // Filter out the deleted note from the state
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes);
    } else {
      console.error("Failed to delete the note");
    }

  }


  return (
    <NoteContext.Provider value={{ notes,addNote,deleteNote,editNote,fetchNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
