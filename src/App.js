import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';

import { BrowserRouter, Route, Routes} from "react-router-dom";
import NoteState from './context/notes/noteState';
import Alert from './Components/Alert';
import { useState } from 'react';


function App() {
  const [alert, setAlert]=useState(null);

  const showALert =(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
    <NoteState>
      <BrowserRouter>  
        <Navbar/>
        <Alert alert={alert}/>
        {/* <Alert message="Initalization is underway for this app "/> */}
        <div className="container">
        <Routes>
          <Route exact path='/' element={<Home showALert={showALert}/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/login' element={<Login showALert={showALert}/>}/>
          <Route exact path='/signup' element={<Signup showALert={showALert}/>}/>

        </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  </>
  );
}

export default App;
