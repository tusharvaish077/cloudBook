import React from "react";
import NoteContext from "./notesContext";
import { useState } from "react";

const NoteState = (props)=> {
    const host = "http://localhost:5000"
    const notesInitial = [];
        //Get all Notes 
        const getNotes= async()=>{
          //adding a new note
          const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'get',
            headers: {
              'Content-Type':'application/json',
               "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZTEwY2JmMGE5MWVhNGYyOGNkYzAyIn0sImlhdCI6MTcwMTcxMjA3NX0.XV3hjehK2xgDj5b-oh3GTQK4JpoZri46IAO_qosXwJc"
            },
          });
          
          const json = await response.json();
          console.log(json);
          setNotes(json);          
        }

    const [notes, setNotes] = useState(notesInitial);

    //Add Notes 
    const addNote= async(title, description, tag)=>{
      //adding a new note
      const response = await fetch(`${host}/api/notes/addnote`,{
        method:'post',
        headers: {
          'Content-Type':'application/json',
           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZTEwY2JmMGE5MWVhNGYyOGNkYzAyIn0sImlhdCI6MTcwMTcxMjA3NX0.XV3hjehK2xgDj5b-oh3GTQK4JpoZri46IAO_qosXwJc"
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });
      
      //TODO :  Api calls for the deletion on the backend too.
      console.log("addnote running")
       const note = {
        "_id": "6589d2f24cf3e65ad215462",
        "user": "6589cfb14cf33e65ad215460",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-12-25T19:07:30.520Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
    }
    
    //Delete Note
    const deleteNote =async (id)=> {
      //TODO :  Api calls for the deletion on the backend too.
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type':'application/json',
           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZTEwY2JmMGE5MWVhNGYyOGNkYzAyIn0sImlhdCI6MTcwMTcxMjA3NX0.XV3hjehK2xgDj5b-oh3GTQK4JpoZri46IAO_qosXwJc"
        },
        
      });
      const json= response.json();
      console.log("Deleting the Note with id"+ id);
      const newNote = notes.filter((notes)=>{ return notes._id!==id});
      setNotes(newNote);
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
      // API Call 
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZTEwY2JmMGE5MWVhNGYyOGNkYzAyIn0sImlhdCI6MTcwMTcxMjA3NX0.XV3hjehK2xgDj5b-oh3GTQK4JpoZri46IAO_qosXwJcd"
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json(); 
  
       let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }
      }  
      setNotes(newNotes);
    }
  

    return(
        // <NoteContext.Provider value={{state, update}}>
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;