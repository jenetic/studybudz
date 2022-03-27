import React, { useEffect, useState } from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import './Login.css';
import logo from '../images/group-of-happy-business-people.svg';


function Login({ isAuth, setIsAuth }) {
  
  let navigate = useNavigate();

  // If user is already logged in, redirect to Home
  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      navigate("/home");
    }
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/profile");
    });
  };

  return (
    
    <div className="loginPage">
      <div>
        <div id="topbar"></div>
        <h1 id="StudyBuddies">Study Buddies</h1>
        <h2 className="center" id="tagline">Insert some tagline or something.</h2>
        {/* <div className='illustration'>
          <img src={logo}alt='illustration' height={1000}/>
        </div> */}

        <figure>
          <div>
            <div className='illustration'/>
          </div>
        </figure>


      </div>
      
        <button id="login" onClick={signInWithGoogle}>Sign in with Google</button>
      
        <div className='noticebox'>
          <div className='content'>
            <h2 id="notice">NOTICE</h2>
            <p id="disclaimer">On this site, your school email address is <b>PUBLICLY AVAILABLE </b>
            to other users. By signing up, you agree to have your school email address 
            displayed on your profile.<br></br>
            When working with your study buddy, please be mindful of Academic Integrity 
            rules specified by the univsersity.</p>
          </div>
        </div>
    </div>
  )
}

export default Login;