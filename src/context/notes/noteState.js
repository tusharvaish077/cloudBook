import React from "react";
import NoteContext from "./notesContext";
import { useState } from "react";

const NoteState = (props)=> {
    const host = "http://localhost:5000"
    const notesInitial = [
        {
          "_id": "6589d2f24cf33e65ad215462",
          "user": "6589cfb14cf33e65ad215460",
          "title": "How far we came",
          "description": "the lord jesus has taken us to this path of solitude where we get rid from out sins and freed from the pains and sufferings.",
          "tag": "General",
          "date": "2023-12-25T19:07:30.520Z",
          "__v": 0
        },
        {
          "_id": "6589d3a34cf33e65ad215464",
          "user": "6589cfb14cf33e65ad215460",
          "title": "Its time to go",
          "description": "As long as I go for the path of true inner peace I find you dear mom!, whenever I found myself in suffering I remind you mom you are my strength",
          "tag": "General",
          "date": "2023-12-25T19:10:27.315Z",
          "__v": 0
        }
      ]
    // const s1 ={
    //     "name":"Tushar",
    //     "class":"77c"
    // }
    // const [state, setfirst] = useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setfirst({
    //             "name":"Mehrab",
    //             "class":"445g"
    //         })
    //     }, 1000);
    // }
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
      const json= response.json();
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
    const deleteNote =(id)=> {
      //TODO :  Api calls for the deletion on the backend too.
      console.log("Deleting the Note with id"+ id);
      const newNote = notes.filter((notes)=>{ return notes._id!==id});
      setNotes(newNote);
    }
    //Edit Note
    const editNote =async(id, title, description, tag)=> {
      //API call
      const response = await fetch(`${host}/api/updatenotes/${id}`,{
        method:'post',
        headers: {
          'Content-Type':'application/json',
           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZTEwY2JmMGE5MWVhNGYyOGNkYzAyIn0sImlhdCI6MTcwMTcxMjA3NX0.XV3hjehK2xgDj5b-oh3GTQK4JpoZri46IAO_qosXwJc"
        },
        body: JSON.stringify({title, description,tag}), // body data type must match "Content-Type" header
      });
      const json= response.json();
            
      //Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title= title;
          element.description=description;
          element.tag = tag;
        }
      }
    }

    return(
        // <NoteContext.Provider value={{state, update}}>
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;