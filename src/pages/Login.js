import React, { useEffect } from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import '../Styles.css';

const Login = ({ isAuth, setIsAuth }) => {
  
  let navigate = useNavigate();

  // If user is already logged in, redirect to Home
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    } 
  }, []);

  // Sign in with Google
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
        <div id="loginTopBar"></div>
        <h1 id="loginTitle">Study Budz - UC San Diego</h1>
        <h2 className="center" id="tagline">Find your study match!</h2>
        <figure>
          <div>
            <div className='illustration'/>
          </div>
        </figure>

      </div>
        <button id="loginButton" className="button1" onClick={signInWithGoogle}>Sign in with Google</button>
        <div className='noticeBox'>
          <div className='content'>
            <h2 id="notice">NOTICE</h2>
            <p id="disclaimer">
              On this site, the name associated with your Google account will be displayed to other users.
              By signing up, you agree to have your name displayed on your profile.
            </p>
          </div>
        </div>
    </div>
  )
}

export default Login;