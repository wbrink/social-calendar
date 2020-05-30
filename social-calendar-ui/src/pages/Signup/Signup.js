import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css"

const Signup = () => {

  return (
    
    <div className="container">{/* header will be a component inside of the sidenavbar component*/}
    <div className="row justify-content-center">
      <div className="col-8" id="LoginContainer">
          <div className="col-fliud" id="LoginHeader">
              Sign up
          </div>
          <div className="row justify-content-center">
            <div className="col-12" id="FormContainer">
            <div className="col labels">
                   Username
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Username" type="text"/>
               </form>
               <div className="col labels" >
                   Password
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Password" type="text"/>
               </form>
               <div className="col labels" >
                   Confirm Password
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Password" type="text"/>
               </form>
               <div className="row justify-content-center">
               <Link className="col-9"  id="SignupLink" to="/Signup">{/*have an onclick event that runs a function that sends an api request to create a new user*/}
                       Signup
               </Link>
               </div>
               <div className="row justify-content-center">
                   <div className="col" id="SignUpPageOr">
                       Or
                   </div>
               </div>
               <div className="row justify-content-center">{/* */}
                   <input className="col-9" id="LoginButton" type="submit" value="Login"/>
               </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;
