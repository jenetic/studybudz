import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { getDocs, collection, doc } from 'firebase/firestore';


function Home({ isAuth }) {
  
  let nagivate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const usersColRef = collection(db, "users");

  // If user not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  // Get all users
  useEffect(() => {
    let unmounted = false;
    const getUsers = async () => {
      const data = await getDocs(usersColRef);
      if (!unmounted) {
        setUsersList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
    };
    getUsers();
    return () => {
      unmounted = true;
    }
  });

  // Display users
  return (
    <div className="homePage">
      <h1>My Matches</h1>
      <p>(just displays all of the users except you in no order right now)</p>
      {usersList.filter(doc => doc.id !== auth.currentUser.uid).map((user) => {
        return (
          <div className="user" key={user.id}>
            <h2>{user.name}</h2>
            <div>
              <b>Classes:</b>
              <div>{user.classes}</div>
            </div>
            <br/>
            <div>
              <b>About:</b>
              <div>{user.bio}</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home;