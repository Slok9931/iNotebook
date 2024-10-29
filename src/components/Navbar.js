import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  const [icon, setIcon] = useState("bi bi-list");
  const handleIcon = () => {
    if(icon === "bi bi-list"){
      setIcon("bi bi-x");
    }
    else{
      setIcon("bi bi-list")
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">&nbsp;&nbsp;<img src="/VisionPro.png" height="30" alt='VisionPro' style={{borderRadius: '10000px'}}></img>&nbsp;iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className={icon} onClick={handleIcon}></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Todos</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/expense-tracker"?"active":""}`} aria-current="page" to="/expense-tracker">Expense Tracker</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
      <Link className={`btn btn-primary mx-1 my-1 ${location.pathname==="/login"?"disabled":""}`} to="/login" role="button">Login</Link>
      <Link className={`btn btn-primary mx-1 my-1 ${location.pathname==="/signup"?"disabled":""}`} to="/signup" role="button">Sign Up</Link>
      </form>:<span><button className='btn btn-primary' onClick={handleLogout}>Logout</button>&nbsp;&nbsp;&nbsp;<Link to="/profile"><img src={`http://10.10.240.185:2000/uploads/`} alt='Profile' height="35" style={{borderRadius: '10000px'}}></img></Link></span>}&nbsp;&nbsp;&nbsp;
      
    </div>
  </div>
</nav>
  )
}

export default Navbar
