import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorHandler from "../../components/errorHandler/ErrorHandler.js"
import "./Signup.css"

const Signup = () => {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/login`; 
        history.push(path);
      }

    const [errorHandle, seterrorHandle] = useState({
        message: ""
    })
    const [formObject, setFormObject] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
      })
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
        console.log(formObject)
      };

      async function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.username && formObject.password && formObject.confirmPassword) {
          if(formObject.password !== formObject.confirmPassword){
            console.log("passwords do not match")
            seterrorHandle({message: "Passwords do not match"})
          }else{
            let userCredentials = {username: formObject.username, password: formObject.password, name: formObject.name}
            console.log("Login credintials sent to back end: " + JSON.stringify(userCredentials))
            fetch("/api/createUser", {
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
                    console.log(data)
                })
            };
          }
          else if( formObject.username){
            seterrorHandle({message: "Please enter a valid password"})
            if(formObject.password){
              seterrorHandle({message: "Please confirm password"})
            }
          }
          else if(formObject.username && formObject.password){
              seterrorHandle({message: "Passwords do not match"})
          }
        //clear forms

    }

  return (
    
    <div className="container">{/* header will be a component inside of the sidenavbar component*/}
    <div className="row justify-content-center">
      <div className="col-8 box" id="LoginContainer">
          <div className="col-fliud" id="LoginHeader">
              Sign up
          </div>
          <div className="row justify-content-center">
            <div className="col-12" id="FormContainer">
            <div className="col labels">
                   Name
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Name" name="name" onChange={handleInputChange} type="text"/>
               </form>
            <div className="col labels">
                   Username
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Username" name="username" onChange={handleInputChange} type="text"/>
               </form>
               <div className="col labels" >
                   Password
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Type your Password" name="password" onChange={handleInputChange} type="password"/>
               </form>
               <div className="col labels" >
                   Confirm Password
               </div>
               <form className="col" action="">
                   <input className="col" placeholder="Confirm Password" name="confirmPassword" onChange={handleInputChange} type="password"/>{/**add component for rendering error msgs when username is already taken or password is wrong */}
               </form>
               <ErrorHandler message = {errorHandle.message}/>
               <div className="row justify-content-center">
               <Link className="col-9" onClick={handleFormSubmit} id="SignupLink">{/*have an onclick event that runs a function that sends an api request to create a new user*/}
                       Signup
               </Link>
               </div>
               <div className="row justify-content-center">
                   <div className="col" id="SignUpPageOr">
                       Or
                   </div>
               </div>
               <div  className="row justify-content-center">{/* */}
                   <input className="col-9" id="LoginButton" onClick={routeChange} type="submit" value="Login"/>
               </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;
