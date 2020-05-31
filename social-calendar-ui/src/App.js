import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";//edited file
import Login from "./pages/Login/Login.js"
import SignUp from "./pages/Signup/Signup.js"
import UserContext from "./UserContext.js"
function App() {
  // create logged in provider
  // const [user, setUser] = useState(); // by defualt false
  const [userState, setuserState] = useState({
    loggedIn: false,
    username: "",
    _id: "",
    userProps: {
        friendsList: [{}],
        events: [{}]
    },
    logIn: (username, _id, loggedIn) => {
      console.log(username, _id, loggedIn)
      setuserState({...userState, username, _id, loggedIn})
      console.log("new user state: " + username, _id, loggedIn)
    }
  })

  return (
    //any links that are used in other pages must have a component and path specified here
    <Router>
      <UserContext.Provider value={userState}>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUp" component={SignUp} />
      </UserContext.Provider>
    </Router>
  );
}
export default App;