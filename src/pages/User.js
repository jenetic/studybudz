import React, { useEffect, useState } from 'react';
import { db } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../Styles.css';

const User = ({ isAuth }) => {
  // If user not authenticated, redirect to login page
  let nagivate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  const userColRef = collection(db, "users");
  const user = useParams();
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");

  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === user.id) {
          document.getElementById("userProfileDisplayName").textContent = doc.data().name;
          document.getElementById("userProfileMajor").textContent = doc.data().major;
          document.getElementById("userProfileClasses").textContent = doc.data().classes.join(", ");
          document.getElementById("userProfileBio").textContent = doc.data().bio;
          setEmail(doc.data().email);
          setInstagram(doc.data().instagram);
          setDiscord(doc.data().discord);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div className="page">
      <h1 id="userProfileDisplayName" className="title">Name</h1>
      <div id="userProfileMajor" className="userProfileContent"></div>
      <br/>
      <b className="userProfileHeader">Classes</b>
      <br/>
      <div id="userProfileClasses" className="userProfileContent"></div>
      <br/>
      <b className="userProfileHeader">About</b>
      <br/>
      <div id="userProfileBio" className="userProfileContent"></div>
      <br/>
    
      {email !== "" &&
        <div className="userProfileSocial">
          <FontAwesomeIcon id="emailIcon" className="contactIcon" icon={faEnvelope}/>
          <a id="userProfileEmail" className="userProfileLink" href={`mailto:${email}`} target="_blank">{email}</a>
        </div>
      }

      {instagram !== "" &&
        <div className="userProfileSocial">
          <FontAwesomeIcon className="contactIcon" icon={faInstagram}/>
          <a id="userProfileInstagram" className="userProfileLink" href={`https://www.instagram.com/${instagram}`} target="_blank">{instagram}</a>
        </div>
      }

      {discord !== "" &&
        <div className="userProfileSocial">
          <FontAwesomeIcon id="discordIcon" className="contactIcon" icon={faDiscord}/>
          <span id="userProfileDiscord" className="userProfileContactText">{discord}</span>
        </div>
      }

    </div>
  )
}

export default User;