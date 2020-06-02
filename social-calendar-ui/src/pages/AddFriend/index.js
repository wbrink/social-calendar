import React, {useState, useEffect, useContext, useRef} from "react";
import "./style.css";
import UserContext from "../../UserContext";
import { isLoggedIn } from "../../utils/isLoggedIn";

export default function AddFriends(props) {

  // get access to userstate
  const userState = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    console.log("clicked the list group");
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("button clicked");
  }

  // want to load the friends on mount and check that the user is logged in
  useEffect(() => {
    isLoggedIn(userState, props);
  }, [])

  useEffect(() => {
    // search the users api 
    if (search === "") {
      return;
    }
    setLoading(true);
    // search for user that is searched
    fetch("/api/user-search", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: search})
    }).then(response => {return response.json()})
      .then(users => {
        // console.log("data from fetch", users);
        if (users === false) {
          setUsers([]);
          setLoading(false);
        } else {
          setUsers(users);
          setLoading(false);
        }
        console.log(loading.current);
      })
      
  }, [search])

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
          <input type="text" onChange={(e) => {setSearch(e.target.value)}} placeholder="Search" id="search-friend-list" name="search" autoComplete="off"/>
      </form>
      
      {/* holds the contacts */}
      <div className="friend-container">
        
        <ul className="list-group">

          {loading == true && <h4>Loading</h4>}
          {users.length === 0 && search.length > 0 && loading==false && <h4 id="no-users-found">No Users Found</h4>}
          {users.length > 0 && loading == false && users.map((user, index) => {
            return (
              <div className="list-item">
                <li key={user._id} className='user-li'>{user.username}</li>
                <button onClick={handleButtonClick} class="btn btn-primary">Invite</button>
              </div>
            ) 
          })}

        </ul>
      </div>

    </div>
    
  )
}