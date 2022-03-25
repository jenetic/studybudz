import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { getDocs, collection, doc } from 'firebase/firestore';


function Home({ isAuth }) {

  // If user not authenticated, redirect to login page
  let nagivate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  // Get all users from database
  const [usersList, setUsersList] = useState([]); 
  const usersColRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColRef);
      setUsersList(data.docs.filter(doc => doc.id !== auth.currentUser.uid).map((doc) => ({...doc.data()})));
    } 
    getUsers();
  }, []);

  // Display users
  return (
    <div>
      <div className="homePage">
        <h1>My Matches</h1>
        <p>(just displays all of the users except you in no order right now)</p>
        {usersList.map((user) => {
          return (
            <div className="user" key={user.name}>
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
    </div>
  )
}

export default Home;