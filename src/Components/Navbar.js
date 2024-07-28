import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function Navbar() {
  let navigator = useNavigate();
  let location = useLocation();

  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigator("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="navbar-brand" >CloudBook</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname!=="/" ? "":"active"}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about" ? "active":""}`} to="/about">About</Link>
            </li>
            

          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-danger mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-danger mx-2" to="/signup" role="button">SignUp</Link>

          </form>:<Link className="btn btn-primary" onClick={handleLogout} to="/login">Logout</Link>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar