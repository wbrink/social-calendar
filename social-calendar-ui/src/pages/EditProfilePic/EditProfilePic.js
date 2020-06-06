import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import "./EditProfilePic.css";
const EditProfilePic = (props) => {
  const {userState, setUserState} = useContext(UserContext);
  // state variables to edit
  const [name, setName] = useState(userState.name);
  const [bio, setBio] = useState(userState.bio);
  const [location, setLocation] = useState(userState.location);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <img id="profilepic" src="https://via.placeholder.com/90" />
        <img id="profilepic" src="https://via.placeholder.com/90" />
        <img id="profilepic" src="https://via.placeholder.com/90" />
      </div>
    </div>
  );
};
export default EditProfilePic;