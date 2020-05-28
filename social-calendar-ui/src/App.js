import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup.js"

function App() {
  
  return (
    <Router>
    <Route exact path="/LoginSignup" component={LoginSignup} />

    </Router>
  );
}

export default App;
