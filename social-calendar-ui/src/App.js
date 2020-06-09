import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //edited file
import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Signup/Signup.js";
import EditProfile from "./pages/EditProfile/EditProfile.js";
import EditProfilePic from "./pages/EditProfilePic/EditProfilePic.js";
import UserContext from "./UserContext.js";
////

import Profile from "./pages/Profile/Profile.js";
import { createBrowserHistory as createHistory } from "history";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import AddFriends from "./pages/AddFriend/index.js";
import ViewFriends from "./pages/ViewFriends/index.js";
const history = createHistory();

////

function App({ calendarStore }) {
  //handle change search bar
  const handleChange = (e) => {
    // setSearch(e.target.value.toLowerCase());
  };
  //
  const [search, setSearch] = useState("");
  // create logged in provider
  const [userState, setUserState] = useState({
    username: "",
    name: "", 
    _id: "", 
    friends: [],
    bio: "", 
    location: "", 
    events: [], 
    createdAt: "", 
    loggedIn: false
  });


  // const [userState, setuserState] = useState({
  //   loggedIn: false,
  //   username: "",
  //   name: "",
  //   _id: "",
  //   friends: [],
  //   bio: "",
  //   userLocation: "",
  //   events: [],
  //   createdAt: "",
  //   logIn: (username, name, _id, friends, bio, userLocation, events, createdAt, loggedIn) => {
  //     console.log(username, _id, loggedIn);
  //     setuserState({ ...userState, username, name, _id, friends, bio, userLocation, events, createdAt, loggedIn });
  //     console.log("new user state: " + username, name,  _id, friends, bio, userLocation, events, createdAt, loggedIn);
  //   },
  // });

  return (
    //any links that are used in other pages must have a component and path specified here
    <Router history={history}>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a class="navbar-brand py-0" href="/profile">
          SC
        </a>

        {/* <button class="btn btn-success ml-auto mr-1 py-0">Always Show</button> */}

        {/* SEARCH FORM */}
        <form
          id="search-friend-list-form"
          class="btn btn-success ml-auto mr-1 py-0"
          onSubmit={(e) => {
            return e.preventDefault();
          }}
        >
          <svg
            class="bi bi-search"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
            />
            <path
              fill-rule="evenodd"
              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
            />
          </svg>
          <label htmlFor="search-friend-list">Search</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search"
            id="search-friend-list"
            name="search"
            autoComplete="off"
          />
        </form>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse flex-grow-0 py-0"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav text-right">
            <li class="nav-item active">
              <a class="nav-link" href="/friends">
                View Friends
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/login">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <UserContext.Provider value={{userState, setUserState}}>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/addfriend" component={AddFriends} />
        <Route exact path="/friends" component={ViewFriends} />
        <Route exact path="/EditProfile" component={EditProfile} />
        <Route exact path="/EditProfilePic" component={EditProfilePic} />
        <Route
          exact
          path="/Profile"
          exact
          component={(props) => (
            <Profile {...props} calendarStore={calendarStore} />
          )}
        />

        <Route exact path="/Profile/:usernameParam" component={(props) => (<Profile {...props} calendarStore={calendarStore} />)}  />

      </UserContext.Provider>
    </Router>
  );
}
export default App;
