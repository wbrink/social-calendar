import React from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css"

const LoginSignup = () => {

  return (
    <div className="container">{/* header will be a component inside of the sidenavbar component*/}
      <div className="row justify-content-center">
        <div className="col-8" id="LoginSignupContainer">
            <div className="row justify-content-center">
              {/* <Link to={"/SignUp/"}> */}
              <button className="col-5">Sign Up</button> {/* change button to a href links*/}
              {/* </Link> */}
            </div>
            <div className="row justify-content-center">
              <button className="col-5">Log In</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
