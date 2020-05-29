import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup.js"
import Login from "./pages/Login/Login.js"
<<<<<<< HEAD
import Signup from "./pages/Signup/Signup.js"
import ViewFriends from "./components/ViewFriends";

=======
import SignUp from "./pages/Signup/Signup.js"
>>>>>>> ac9ed813f9b42b88b51e135ed4cd41806129151d
function App() {
  
  return (
    //any links that are used in other pages must have a component and path specified here
    <Router>
    <Route exact path="/LoginSignup" component={LoginSignup} />
    <Route exact path="/Login" component={Login} />
<<<<<<< HEAD
    <Route exact path="/Signup" component={Signup} />
    <Route exact path="/friends" component={ViewFriends} />
=======
    <Route exact path="/SignUp" component={SignUp} />
    
>>>>>>> ac9ed813f9b42b88b51e135ed4cd41806129151d
    </Router>
  );
}

export default App;
