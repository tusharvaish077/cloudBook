import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';

import { BrowserRouter, Route, Routes} from "react-router-dom";
import NoteState from './context/notes/noteState';
import Alert from './Components/Alert';
function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>  
        <Navbar/>
        {/* <Alert message="Initalization is underway for this app "/> */}
        <div className="container">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  </>
  );
}

export default App;
