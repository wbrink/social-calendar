import React, {useContext, useState, useEffect}from "react";
import { Link } from "react-router-dom";
import "./Login.css"
// import API from "./LoginAPI.js"
import UserContext from "../../UserContext";

const Login = (props) => {
    
    const {user, setUser } = useContext(UserContext)
    
    const [formObject, setFormObject] = useState({
        username: "",
        password: ""
      })
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

      async function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.username && formObject.password) {
            let userCredentials = {username: formObject.username, password: formObject.password}
            console.log(userCredentials)
            fetch("/api/login", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                body: JSON.stringify(userCredentials) // body data type must match "Content-Type" header
              })
                .then(response => response.json())
                .then(data => {
                  if ("msg" in data ) {
                    if (data.msg.toLowerCase() === "invalid login") {
                      // tell the user incorrect login
                      console.log("Incorrect Login please try again");
                    }
                  } else {
                    // set user
                    setUser(data);
                    
                    // redirect the user to another page
                    props.history.push("/friends");
                  }
                })
        };
        //clear forms
    }
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
                   <input className="col" placeholder="Type your Username" name="username" onChange={handleInputChange} type="text"/>
               </form>
               <div className="col labels">
                   Password
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Password" name="password" onChange={handleInputChange} type="password"/>
               </form>
               <div className="row justify-content-center" id="LoginButtonContainer">
                   <input className="col-9 buttons" type="submit" onClick={handleFormSubmit} value="Login"/>
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
