import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"; //edited file
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
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark ">
        <a class="navbar-brand py-0 justify-content-end" href="/profile">
          SC
        </a>
        {/* <button class="btn btn-success ml-auto mr-1 py-0">Always Show</button> */}
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
              <a class="nav-link" href="/addfriend">
                Add Friends
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
      <Route exact path ="/"> 
        <Redirect to="/Login" />
        </Route>
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
