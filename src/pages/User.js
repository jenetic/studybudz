import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { doc, setDoc, collection, getDocs, set } from "firebase/firestore";
import '../Styles.css';

function User({ isAuth, match }) {
  // If user not authenticated, redirect to login page
  let nagivate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  const userColRef = collection(db, "users");
  const user = useParams();

  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === user.id) {
          document.getElementById("userProfileDisplayName").textContent = doc.data().name;
          document.getElementById("userProfileClasses").textContent = doc.data().classes.join(", ");
          document.getElementById("userProfileBio").textContent = doc.data().bio;
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
      <b className="userProfileHeader">Classes</b>
      <br/>
      <div id="userProfileClasses" className="userProfileContent"></div>
      <br/>
      <b className="userProfileHeader">About</b>
      <br/>
      <div id="userProfileBio" className="userProfileContent"></div>
    </div>
  )
}

export default User;