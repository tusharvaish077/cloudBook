import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';

export const Home = (props) => {
  const {showALert} = props;
  return (
    <div>

    <Notes showALert={showALert}/>
    </div>
  )
}
export default  Home