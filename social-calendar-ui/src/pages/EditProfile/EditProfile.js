import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

import "./EditProfile.css";

const EditProfile = (props) => {

  const {userState, setUserState} = useContext(UserContext);
  
  // state variables to edit
  const [name, setName] = useState(userState.name);
  const [bio, setBio] = useState(userState.bio);
  const [location, setLocation] = useState(userState.userLocation);

  console.log(props);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col" id="EditContainer">
          <div className="col-fliud" id="EditHeader">
            Edit Profile
          </div>

          <div className="row justify-content-center">
            <div class="row" id="rowcss">
              <img id="profilepic" src="https://via.placeholder.com/90" />
              <br></br>
              <center>
                <p class="text-uppercase">
                  <small>
                    <h4>Username {userState.username}</h4>
                  </small>
                </p>
                <a href="/editprofilepic">Change Profile Photo</a>
              </center>
            </div>
          </div>
          <div className="col-12" id="FormContainer">
            <div className="col labels">Edit Name</div>
            <form className="col" action="">
              <input className="col" placeholder="Type your Name" type="text" />
            </form>
            <div className="col labels">Edit Bio</div>
            <form className="col" action="">
              <input
                className="col"
                placeholder="Type your Bio"
                type="textbox"
              />
            </form>
            <div className="col labels">Edit Location</div>
            <form className="col" action="">
              <input
                className="col"
                placeholder="Type your Location"
                type="text"
              />
            </form>
            <div className="row justify-content-center">
              <Link className="col-9" id="SignupLink" to="/Signup">
                {/*have an onclick event that runs a function that sends an api request to create a new user*/}
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
