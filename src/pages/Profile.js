import React, { useEffect } from 'react';
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getDocs, set } from "firebase/firestore";
import '../Styles.css';

const Profile = ({ isAuth }) => {
  
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
      // major: major.value,
      name: auth.currentUser.displayName,
      major: document.getElementById("majorInput").value,
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
          document.getElementById("majorInput").value = doc.data().major;
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

    // Display "Saved!" Message
    document.getElementById("saveMessage").style.display = "block";
    document.getElementById("invalidEmailMessage").style.display = "none";
  };

  // UI
  return (
    <div className="page">      
      <h1 className='title'>My Profile</h1>
    
      {/* <ReactSelect id="majorDropdown"
                   options={testOptions}
                   value={major} 
                   onChange={(s) => {setMajor(s)}}/> */}

      <h2 className="inputHeaderBig">About</h2>
      <div className="inputSection">
        <b className="inputHeader">My Major</b>
        <br/>
        <input id="majorInput" className="inputSmall"></input>
      </div>
      
      <div className="inputSection">
        <b className="inputHeader">My Classes</b>
        <div className="note">Note: Separate classes using commas.</div>
        <input id="classesInput" className="inputSmall"></input>
      </div>
      <br/>

      <div className="inputSection">
        <b className="inputHeader">About Me</b>
        <br/>
        <textarea id="bioInput" className="inputLarge"></textarea>
      </div>
      
      <h2 className="inputHeaderBig">Contact</h2>
      
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


      <br/>
      <button className="button1" id='savebutton' onClick={updateProfile}>Save Profile</button> 
      <div id="saveMessage" className="message">Saved!</div>
      <div id="invalidEmailMessage" className="message">Email address is not valid.</div>
    </div>
  )
}

export default Profile;