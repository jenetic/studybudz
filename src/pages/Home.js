import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { getDocs, collection } from 'firebase/firestore';
import '../Styles.css';

const Home = ({ isAuth }) => {

  // If user not authenticated, redirect to login page
  let nagivate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      nagivate("/");
    }
  }, []);

  const [usersList, setUsersList] = useState([]); 
  const usersColRef = collection(db, "users");
  let myClasses = [];
  let myMajor = "";

  // Retrieve classes of current user
  useEffect(() => {
    getDocs(usersColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          myClasses = doc.data().classes;
          myMajor = doc.data().major;
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  
  // Returns number of "matchPoints" between current user and another user
  // Each class in common gets 1 match point
  // Same major gets 1 match point
  const getMatchPoints = (myClasses, theirClasses, myMajor, theirMajor) => {
    if (myMajor === theirMajor) {
      return myClasses.filter(c => theirClasses.includes(c)).length + 1;
    } else {
      return myClasses.filter(c => theirClasses.includes(c)).length;
    }
  }

  // Get all users from database
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColRef);
      setUsersList(data.docs.filter(doc => doc.id !== auth.currentUser.uid).map((doc) => ({...doc.data(), id: doc.id, matchPoints: getMatchPoints(myClasses, doc.data().classes, myMajor, doc.data().major)})));
    } 
    getUsers();
  }, []);
  
  // Sort users by how many classes they have in commmon
  usersList.sort((a, b) => {
    if (a.matchPoints > b.matchPoints) {
      return -1;
    } else if (a.matchPoints < b.matchPoints) {
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
            <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
              <h2 id="userDisplayName">{user.name}</h2> 
            </Link>
            
            <div id="userContentMajor" className="userContent"><b>{user.major}</b></div>
            <br/>

            <div id="userClasses" className="userSection">
              <b className="userContentHeader">Classes</b>
              <div id="userContentClasses" className="userContent">{user.classes.join(", ")}</div>
            </div>
            <br/>

            <div id="userBio" className="userSection">
              <b className="userContentHeader">About</b>
              <div id="userContentBio" className="userContent">{user.bio}</div>
            </div>

          </div>
        );
      })}
    </div>
  )
}

export default Home;