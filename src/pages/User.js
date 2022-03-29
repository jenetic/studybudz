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
          document.getElementById("userProfileDisplayName").innerHTML = doc.data().name;
          document.getElementById("userProfileClasses").innerHTML = doc.data().classes.join(", ");
          document.getElementById("userProfileBio").innerHTML = doc.data().bio;
          // console.log(doc.data().classes.join(", "));
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
      <textarea id="userProfileClasses" className="userProfileContent" readOnly></textarea>
      <br/>
      <b className="userProfileHeader">About</b>
      <br/>
      <textarea id="userProfileBio" className="userProfileContent" readOnly></textarea>
    </div>
  )
}

export default User;