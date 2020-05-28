import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup"

function App() {
  
  return (
    <Router>
    <Route exact path="/LoginSignup" component={LoginSignup} />
    
    </Router>
  );
}

export default App;
