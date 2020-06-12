import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Signup.css"

const Signup = () => {

    const [formObject, setFormObject] = useState({
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
          }else{
            let userCredentials = {username: formObject.username, password: formObject.password}
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
        //clear forms

    }

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
                   <input className="col" placeholder="Confirm Password" name="confirmPassword" onChange={handleInputChange} type="password"/>
               </form>
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
               <Link to="/Login" className="row justify-content-center">{/* */}
                   <input className="col-9" id="LoginButton" type="submit" value="Login"/>
               </Link>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;
