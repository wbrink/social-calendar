import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {

  return (
    
    <div className="container">{/* header will be a component inside of the sidenavbar component*/}
    <div className="row justify-content-center">
      <div className="col-8" id="LoginContainer">
          <div className="col-fliud" id="LoginHeader">
              Login
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
               <div className="row justify-content-center" id="LoginButtonContainer">
                   <input className="col-9 buttons" type="submit" value="Login"/>
               </div>
               <div className="row justify-content-center">
                   <div className="col" id="or">
                       Or
                   </div>
               </div>
               <div className="row justify-content-center">
               <Link className="col-9" to="/Signup">
                       Signup
                   </Link>
               </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
