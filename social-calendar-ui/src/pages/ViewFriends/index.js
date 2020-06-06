import React, {useState, useEffect, useContext} from "react";
import "./style.css";
import {Link} from "react-router-dom";
import UserContext from "../../UserContext";
import { isLoggedInCB } from "../../utils/isLoggedIn";

export default function ViewFriends(props) {

  // get access to userstate
  const {userState, setUserState} = useContext(UserContext);


  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    console.log("clicked the list group");
  }

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  }


  // want to load the friends on mount and check that the user is logged in
  useEffect(() => {
    isLoggedInCB(userState, setUserState, props, () => {
      fetch('/api/friends')
      .then(response => response.json())
      .then(data => {
        setFriends(data)
        console.log(data);
      })
    })
  }, []);

  // don't show the route if the user is not logged in
  if (userState.loggedIn === false) {
    return (
      <body></body>
    )
  }


  return (
    
    <div className="body">
      
      <form id="search-friend-list-form" onSubmit={e => {return e.preventDefault()}}>
          
          <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          </svg>
          <label htmlFor="search-friend-list">Search</label>
          <input type="text" onChange={handleChange} placeholder="Search" id="search-friend-list" name="search" autoComplete="off"/>
      </form>
      
      {/* holds the contacts */}
      <div className="friend-container">
        
        <ul className="list-group">
          {friends.map((friend, index) => {
            if (search === "") {
              return <li key={friend._id} className="list-group-item">{friend.username}</li>
            }
            if (friend.username.toLowerCase().startsWith(search)) {
              return <li key={friend._id} className="list-group-item">{friend.username}</li>
            }
          })}

        </ul>
      </div>

     
      <div className="bottom-container">
        <Link to="/addfriend" className="btn btn-primary">Add Friend</Link>
      </div>
    
    </div>
    
  )
}