import React, {useContext, useState, useEffect}from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css"
import UserContext from "../../UserContext";
import { isLoggedInURL } from "../../utils/isLoggedIn";
import ErrorHandler from "../../components/errorHandler/ErrorHandler.js"

const Login = (props) => {
    
    const {userState, setUserState} = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    
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
            console.log("Login credintials sent to back end: " + JSON.stringify(userCredentials))
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
                    if (data.msg === "Invalid login") {
                      invalidLogin(data.msg)
                    } else {
                        // console.log(data)
                        // user.logIn(data.username, data.name, data._id, data.friends, data.bio, data.location, data.events, data.createdAt, true);
                        setUserState({...userState, username: data.username, name: data.name, _id: data._id, friends: data.friends, bio: data.bio, location: data.location, events: data.events, createdAt: data.createdAt, profilePic: data.profilePic, loggedIn: true})
                        
                    }
                })
        };
        //clear forms

        function invalidLogin(err){
          setErrorMessage("Invalid Login");
        }
    }

  useEffect(() => {
    isLoggedInURL(userState,setUserState, props, "/profile");
  }, [])

  
  return (
    <div className="container">{/* header will be a component inside of the sidenavbar component*/}
    <div className="row justify-content-center">
      <div className="col-8 col-md-12 box" id="LoginContainer">
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

                <ErrorHandler message = {errorMessage}/>
                <div className="row justify-content-center" id="LoginButtonContainer">
                    <input className="col-9 buttons" type="submit" onClick={handleFormSubmit} value="Login"/>
                </div>
                <div className="row justify-content-center">
                    <div className="col" id="or">
                        Or
                    </div>
                </div>
                <div className="row justify-content-center">
                <Link className="col-9" id="signUp" to="/Signup">
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
