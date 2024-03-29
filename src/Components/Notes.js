import { useContext } from 'react';
import noteContext from "../context/notes/notesContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes() {
    const context = useContext(noteContext);
    const {notes} = context;
  return (
    <>
    <AddNote/>
    <div className='row my-3'>
      <h2>Your Notes</h2>
      {notes.map((notes)=>{
        return <NoteItem key ={notes._id} notes={notes}/>
      })}
    </div>
    </>
  )
}

export default Notes