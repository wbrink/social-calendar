import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //edited file
import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Signup/Signup.js";
import UserContext from "./UserContext.js";
////

import Profile from "./pages/Profile/Profile.js";
import { createBrowserHistory as createHistory } from "history";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
const history = createHistory();
////

function App({ calendarStore }) {
  // create logged in provider
  // const [user, setUser] = useState(); // by defualt false
  const [userState, setuserState] = useState({
    loggedIn: false,
    username: "",
    _id: "",
    userProps: {
      friendsList: [{}],
      events: [{}],
    },
    logIn: (username, _id, loggedIn) => {
      console.log(username, _id, loggedIn);
      setuserState({ ...userState, username, _id, loggedIn });
      console.log("new user state: " + username, _id, loggedIn);
    },
  });

  return (
    //any links that are used in other pages must have a component and path specified here
    <Router history={history}>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Calendar App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Profile">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <UserContext.Provider value={userState}>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route
          exact
          path="/Profile"
          exact
          component={(props) => (
            <Profile {...props} calendarStore={calendarStore} />
          )}
        />
      </UserContext.Provider>
    </Router>
  );
}
export default App;
