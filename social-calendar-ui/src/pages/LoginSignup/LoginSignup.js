import React from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css"

const LoginSignup = () => {

  return (
    
    <div className="container">{/* header will be a component inside of the sidenavbar component*/}
      <div className="row justify-content-center">
        <div className="col-8 col-lg-10" id="LoginSignupContainer">
            <div className="row justify-content-center">
              <Link to={"/SignUp/"}>
              <div className="links" >Sign Up</div> {/* change button to a href links*/}
              </Link>
            </div>
            <div className="row justify-content-center">
                <Link to={"/Login"}>
                  <div className="links">Log In</div>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
