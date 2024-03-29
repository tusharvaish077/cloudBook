import React,{useContext} from 'react'
import noteContext from "../context/notes/notesContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { notes} = props;
  const { deleteNote } = context;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{notes.title}</h5>
              <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
              <i className="fa-solid fa-pen-to-square mx-2"></i>
            </div>
            <p className="card-text">{notes.description}</p>
          </div>
      </div>
    </div>
  )
}

export default NoteItem