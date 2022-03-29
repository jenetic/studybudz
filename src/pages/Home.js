import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { getDocs, collection } from 'firebase/firestore';
import '../Styles.css';

function Home({ isAuth }) {

  // If user not authenticated, redirect to login page
  let nagivate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  const [usersList, setUsersList] = useState([]); 
  const usersColRef = collection(db, "users");
  let currentUserClasses = [];

  // Retrieve classes of current user
  useEffect(() => {
    getDocs(usersColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          currentUserClasses = doc.data().classes;
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  
  // Gets number of identical elements given 2 arrays
  const sameClassCount = (arr1, arr2) => {
    return arr1.filter(c => arr2.includes(c)).length;
  }

  // Get all users from database
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColRef);
      setUsersList(data.docs.filter(doc => doc.id !== auth.currentUser.uid).map((doc) => ({...doc.data(), id: doc.id, sameClassCount: sameClassCount(currentUserClasses, doc.data().classes)})));
    } 
    getUsers();
  }, []);
  
  // Sort users by how many classes they have in commmon
  usersList.sort((a, b) => {
    if (a.sameClassCount > b.sameClassCount) {
      return -1;
    } else if (a.sameClassCount < b.sameClassCount) {
      return 1;
    } else {
      return 0;
    }
  })

  // Display users
  return (
    <div className='page'>
      <h1 className='title'>My Matches</h1>
      {usersList.map((user) => {
        return (
          <div className="matchesUserBox" key={user.id}>
            {/* TODO: Make this a read-only text area */}
            <Link to={`/user/${user.id}`}>
              <h2 id="userDisplayName">{user.name}</h2> 
            </Link>
            <div id="userClasses" className="userSection">
              <b>Classes:</b>
              <textarea id="userContentClasses" className="userContent" readOnly value={user.classes.join(", ")}></textarea>
            </div>
            <br/>
            <div id="userClasses" className="userSection">
              <b>About:</b>
              <textarea id="userContentBio" className="userContent" readOnly value={user.bio}></textarea>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home;