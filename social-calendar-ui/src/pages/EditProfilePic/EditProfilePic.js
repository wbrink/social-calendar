import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { isLoggedInCB, isLoggedIn } from "../../utils/isLoggedIn";
import "./EditProfilePic.css";

const EditProfilePic = (props) => {
  const { userState, setUserState } = useContext(UserContext);
  
  // state variables to edit
  const [profilePic, setprofilePic] = useState(userState.profilePic);
  const [active, setActive] = useState("") // holds the name of image

  // goes to the last page the user was on
  const goBack = () => {
    props.history.push("/editprofile");;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/edit-profile-pic", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profilePic: profilePic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserState( {...userState, profilePic: profilePic });
        props.history.push("/profile");
      });
  };


  const handleClick = (e) => {
    setprofilePic(e.target.dataset.id);
    setActive(e.target.dataset.id); // sets the image as active on click which sets a border around the image
  }

  useEffect(() => {
    isLoggedIn(userState, setUserState, props);
  }, []);

  // on refresh if the userState is changed
  useEffect(() => {
    if (userState.loggedIn) {
      setprofilePic(userState.profilePic);
    }
  }, [userState]);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col" id="EditContainer">
          <div className="col-fliud" id="EditHeader">
            Edit Profile Picture
          </div>

          <div className="row ">
            <div className="row d-flex justify-content-center " id="rowcss">
              <img src="/images/guy.png" className={active == "/images/guy.png" ? ("clicked") : ("noClick")} data-id="/images/guy.png" id="profilepic" onClick={handleClick} />
              <img src="/images/girl1.png" className={active == "/images/girl1.png" ? ("clicked") : ("noClick")} data-id="/images/girl1.png" id="profilepic" onClick={handleClick}/>
              <img src="/images/guy2.png" className={active == "/images/guy2.png" ? "clicked" : "noClick"} data-id="/images/guy2.png" id="profilepic" onClick={handleClick}/>
              <img src="/images/girl2.png" className={active == "/images/girl2.png" ? "clicked" : "noClick"} data-id="/images/girl2.png" id="profilepic" onClick={handleClick}/>
              <img src="/images/girl3.png" className={active == "/images/girl3.png" ? "clicked" : "noClick"} data-id="/images/girl3.png" id="profilepic" onClick={handleClick}/>
              <img src="/images/bluemonster.jpg" className={active == "/images/bluemonster.jpg" ? "clicked" : "noClick"} data-id="/images/bluemonster.jpg" id="profilepic" onClick={handleClick}/>
              <img src="/images/orangemonster.jpg" className={active == "/images/orangemonster.jpg" ? "clicked" : "noClick"} data-id="/images/orangemonster.jpg" id="profilepic" onClick={handleClick}/>
              <img src="/images/flower.jpeg" className={active == "/images/flower.jpeg" ? "clicked" : "noClick"} data-id="/images/flower.jpeg" id="profilepic" onClick={handleClick}/>
              <img src="/images/dog.jpg" className={active == "/images/dog.jpg" ? "clicked" : "noClick"} data-id="/images/dog.jpg" id="profilepic" onClick={handleClick}/>
            </div> 
          </div>

          <div className="row justify-content-center">
            <div className="col-9 text-center save-cancel-btn save-cancel-btnRed"  onClick={handleSubmit}>Save</div>
            <div className="col-9 text-center save-cancel-btn save-cancel-btnGrey" onClick={goBack}>Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfilePic;
