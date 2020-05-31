import React, {useContext, createContext, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js"
import SignUp from "./pages/Signup/Signup.js"
import UserContext from "./UserContext.js"
import ViewFriends from "./pages/ViewFriends";

function App() {
  // create logged in provider
  const [user, setUser] = useState(false); // by defualt false
  return (
    //any links that are used in other pages must have a component and path specified here
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/friends" component={ViewFriends} />
      </UserContext.Provider>
    </Router>
  );
}
export default App;