import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getDocs, set } from "firebase/firestore";
import '../Styles.css';
import { components, default as ReactSelect } from "react-select";

function Profile({ isAuth }) {
  
  let nagivate = useNavigate();
  const userColRef = collection(db, "users");
  // const [major, setMajor] = useState("");

  // If user not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  // const testOptions = [
  //   {value: "red", label: "red"},
  //   {value: "blue", label: "blue"},
  // ];

  // Retrieve profile info when page loads
  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("majorInput").value = doc.data().major;
          document.getElementById("classesInput").value = doc.data().classes.join(", ");
          document.getElementById("bioInput").value = doc.data().bio;
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  // Update profile
  const updateProfile = async () => {
    // Add/update to Cloud Firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      // major: major.value,
      major: document.getElementById("majorInput").value,
      classes: document.getElementById("classesInput").value.split(",").map(x => x.trim()),
      bio: document.getElementById("bioInput").value,
      name: auth.currentUser.displayName
    });

    // Retrieve profile info when updated
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("majorInput").value = doc.data().major;
          document.getElementById("classesInput").value = doc.data().classes.join(", ");
          document.getElementById("bioInput").value = doc.data().bio;
        }
      });
    })
    .catch(err => {
      console.log(err);
    }); 

    // Displays "Saved!" after saving
    const showSaveMessage = () => {
      document.getElementById("saveMessage").style.display = "block";
    }
    showSaveMessage();
  };

  // UI
  return (
    <div className="page">      
      <h1 className='title'>My Profile</h1>
    
      {/* <ReactSelect id="majorDropdown"
                   options={testOptions}
                   value={major} 
                   onChange={(s) => {setMajor(s)}}/> */}


      <div className="inputSection">
        <b className="inputHeader">My Major</b>
        <br/>
        <input id="majorInput" className="inputSmall"></input>
      </div>
      
      <div className="inputSection">
        <b className='inputHeader'>My Classes</b>
        <div className='note'>Note: Separate classes using commas.</div>
        <input className="inputSmall" id="classesInput"></input>
      </div>
      <br/>

      <div className="inputSection">
        <b className='inputHeader'>About Me</b>
        <br/>
        <textarea className="inputLarge" id="bioInput"></textarea>
      </div>
      <br/>
      <button className="button1" id='savebutton' onClick={updateProfile}>Save Profile</button> 
      <div id="saveMessage">Saved!</div>
    </div>
  )
}

export default Profile;