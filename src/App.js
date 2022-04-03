import './Styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config"
import { signOut } from 'firebase/auth';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import User from "./pages/User";
import Toggle, { keepTheme } from "./utils/Toggle";

const App = () =>  {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  useEffect(() => {
    keepTheme();
  })

  return (
    <Router>
      <nav>
        {!isAuth ? (
          <div></div>
        ) : (
          <div className='sidebar'>
            <Link to="/home">Matches</Link>
            <Link to="/profile">Profile</Link>
            <Toggle id="themeToggleButton"></Toggle>
            <button id="logoutButton" className="button2" onClick={signUserOut}> Log Out </button>
          </div>
        )}
      </nav>
      
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/profile" element={<Profile isAuth={isAuth}/>} />
        <Route path="/home" element={<Home isAuth={isAuth}/>} />
        <Route path="/user/:id" element={<User isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;