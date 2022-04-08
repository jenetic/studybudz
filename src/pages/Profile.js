import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { default as ReactSelect } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { stylesLight, stylesDark } from '../utils/dropdown-settings'
import { majorOptions } from '../utils/major-options'
import '../Styles.css';

const Profile = ({ isAuth }) => {
  
  let nagivate = useNavigate();
  const userColRef = collection(db, "users");
  const [major, setMajor] = useState("");
  const [editMajor, setEditMajor] = useState(false);
  const[secondMajor, setSecondMajor] = useState("");
  const [editSecondMajor, setEditSecondMajor] = useState(false);

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
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("majorInput").textContent = doc.data().major;
          document.getElementById("secondMajorInput").textContent = doc.data().secondMajor;
          document.getElementById("classesInput").value = doc.data().classes.join(", ");
          document.getElementById("bioInput").value = doc.data().bio;
          document.getElementById("instagramInput").value = doc.data().instagram;
          document.getElementById("emailInput").value = doc.data().email;
          document.getElementById("discordInput").value = doc.data().discord;
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  // Update profile
  const updateProfile = async () => {
  
    // Prepare major and class data to pass into database
    let majorToUpdate = "";
    
    if (editMajor) {
      major.value == null ? majorToUpdate = [] : majorToUpdate = major.value;
    } else {
      majorToUpdate = document.getElementById("majorInput").textContent;
    }

    let secondMajorToUpdate = "";
    if(editSecondMajor){
      secondMajor.value == null ? secondMajorToUpdate = [] : secondMajorToUpdate = secondMajor.value;
    }
    else {
      secondMajorToUpdate = document.getElementById("secondMajorInput").textContent;
    }
    
    // Check that email is a valid format
    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    }
    const email = document.getElementById("emailInput").value;
    if (!(validateEmail(email) || email === "")) {
      document.getElementById("saveMessage").style.display = "none";
      document.getElementById("invalidEmailMessage").style.display = "block";
      return;
    }

    // Add/update to Cloud Firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      major: majorToUpdate,
      secondMajor: secondMajorToUpdate,
      name: auth.currentUser.displayName,
      classes: document.getElementById("classesInput").value.split(",").map(x => x.trim()),
      bio: document.getElementById("bioInput").value,
      instagram: document.getElementById("instagramInput").value,
      email,
      discord: document.getElementById("discordInput").value
    });

    // Retrieve profile info when updated
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("majorInput").textContent = doc.data().major;
          document.getElementById("secondMajorInput").textContent = doc.data().secondMajor;
          document.getElementById("classesInput").value = doc.data().classes.join(", ");
          document.getElementById("bioInput").value = doc.data().bio;
          document.getElementById("instagramInput").value = doc.data().instagram;
          document.getElementById("emailInput").value = doc.data().email;
          document.getElementById("discordInput").value = doc.data().discord;
        }
      });
    })
    .catch(err => {
      console.log(err);
    }); 

    setEditMajor(false);
    setEditSecondMajor(false);
    

    // Display "Saved!" Message
    document.getElementById("saveMessage").style.display = "block";
    document.getElementById("invalidEmailMessage").style.display = "none";
  };

  // UI
  return (
    <div className="page">      
      <h1 className='title'>My Profile</h1>
      <h1></h1>
      <h2 className="inputHeaderBig">About</h2>
      <div className="inputSection">
        <b className="inputHeader">My Major</b>
        {editMajor ? (
          <div>
            <ReactSelect id="majorDropdown" className="dropdown"
              options={majorOptions}
              value={major} 
              onChange={(s) => {setMajor(s)}}
              styles={localStorage.getItem("theme") === "theme-light" ? stylesLight : stylesDark}
            />
          </div>
        ):(
          <div>
            <div id="majorInput" className="preDropdownText"></div>
            <button className="editButton" onClick={() => {setEditMajor(true)}}>
              <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </button>
            
          </div>
        )}
        <b className="smallHeader">Add a second major</b>
        {editSecondMajor ? (
          <div>
            <ReactSelect id="majorDropdown" className="dropdown"
              options={majorOptions}
              value={secondMajor} 
              onChange={(s) => {setSecondMajor(s)}}
              styles={localStorage.getItem("theme") === "theme-light" ? stylesLight : stylesDark}
            />
          </div>
        ):(
          <div>
            <div id="secondMajorInput" className="preDropdownText"></div>
            <button className="editButton" onClick={() => {setEditSecondMajor(true)}}>
              <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </button>
            
          </div>
        )}
        

      </div>
      
      <div className="inputSection">
        <b className="inputHeader">My Classes</b>
        <div className="note">Note: Separate classes using commas.</div>
        <input id="classesInput" className="inputSmall" placeholder="Format: CSE 12, MATH 20C, etc."></input>
      </div>
      <br/>

      <div className="inputSection">
        <b className="inputHeader">About Me</b>
        <br/>
        <textarea id="bioInput" className="inputLarge"></textarea>
      </div>
      
      <div id="contact">
      <h2 className="inputHeaderBig" >Contact</h2>
      
      <div className="inputSection">
        <b className="inputHeader">Email</b>
        <br/>
        <input id="emailInput" className="inputSmall" placeholder="username@email.com"></input>
      </div>
      <div className="inputSection">
        <b className="inputHeader">Instagram</b>
        <br/>
        <input id="instagramInput" className="inputSmall" placeholder="username"></input>
      </div>
      <div className="inputSection">
        <b className="inputHeader">Discord</b>
        <br/>
        <input id="discordInput" className="inputSmall" placeholder="discordtag#0000"></input>
      </div>
      </div>


      <br/>
      <button className="button1" id='savebutton' onClick={updateProfile}>Save Profile</button> 
      <div id="saveMessage" className="message">Saved!</div>
      <div id="invalidEmailMessage" className="message">Email address is not valid.</div>
    </div>
  )
}

export default Profile;