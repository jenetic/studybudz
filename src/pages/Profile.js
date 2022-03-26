import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getDocs, set } from "firebase/firestore";
import './Profile.css';

function Profile({ isAuth }) {
  
  let nagivate = useNavigate();
  const userColRef = collection(db, "users");
  const [classes, setClasses] = useState("");
  const [bio, setBio] = useState("");
  const [hasProfile, setHasProfile] = useState(true);
  const [edit, setEdit] = useState(false);

  // If user not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  // Retrieve profile info when page loads
  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      let hasProfileTemp = false; 
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("classesInput").innerHTML = doc.data().classes.join(", ");
          document.getElementById("bioInput").innerHTML = doc.data().bio;
          hasProfileTemp = true;
        }
      });
      if (!hasProfileTemp) { setHasProfile(false); }
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  // Update profile
  const updateProfile = async () => {
    // Add/update to Cloud Firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      classes: document.getElementById("classesInput").innerHTML.split(",").map(x => x.trim()),
      bio: document.getElementById("bioInput").innerHTML,
      name: auth.currentUser.displayName
    });

    // Retrieve profile info when updated
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("classesInput").innerHTML = doc.data().classes.join(", ");
          document.getElementById("bioInput").innerHTML = doc.data().bio;
        }
      });
    })
    .catch(err => {
      console.log(err);
    }); 
    // Hide 'Edit Profile' section
    setHasProfile(true);
    setEdit(false);
  };

  // UI
  return (
    <div className="profilePage">      
      <div className="displayInfo">
        <h1 className='titles'>My Profile</h1>
        <div>
          <b className='inputHeader'>My Classes</b>
          <div className='note'>Note: Separate classes using commas.</div>
          {hasProfile ? (
            <div className="smallInput" id="classesInput" contentEditable="true"></div>
          ) : (
            <div id="classesInput" onClick={() => setHasProfile(true)}><i>Add your classes here!</i></div>
          )}
        </div>
        <br/>
        <div>
          <b className='inputHeader'>About Me</b>
          {hasProfile ? (
            <div className="largeInput" id="bioInput" contentEditable="true"></div>
          ) : (
            <div id="bioInput" onClick={() => setHasProfile(true)}><i>Add your bio here!</i></div>
          )}
        </div>
        <br/>
      </div>
      <button id='savebutton' onClick={updateProfile}>Save Profile</button> 
    </div>
  )
}

export default Profile;