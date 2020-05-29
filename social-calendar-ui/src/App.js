import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup.js"
import Login from "./pages/Login/Login.js"
import Signup from "./pages/Signup/Signup.js"
import ViewFriends from "./components/ViewFriends";

function App() {
  
  return (
    //any links that are used in other pages must have a component and path specified here
    <Router>
    <Route exact path="/LoginSignup" component={LoginSignup} />
    <Route exact path="/Login" component={Login} />
    <Route exact path="/Signup" component={Signup} />
    <Route exact path="/friends" component={ViewFriends} />
    </Router>
  );
}

export default App;
