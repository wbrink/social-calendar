import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext.js"
import moment from "moment";
import AddFriendBtn from "../addFriendBtn/AddFriendBtn.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  Link,
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style.css";

export default function UserInfo(props) {
  const [user, setUser] = useState(null);
  const {userState, setUserState} = useContext(UserContext);

  useEffect(() => {
    fetch(`/api/user/${props.name}`)
      .then((res) => res.json())
      .then((userData) => {
        const date = moment(userData.createdAt)
        setUser({ ...userData, createdAt: date.format('LL') });
      });
  }, []);

  if (user == null) {
    return <body></body>;
  }

  console.log(user.friends)

  return (
    <div id="main">
      <div class="row" id="rowcss">
        <div class="col-6">
          <Link id="profilepicContainer" to={"/editprofilepic"}>
            <img id="profilepic" src={user.profilePic} />
          </Link>
          <div className="row">
            <p class="text-uppercase">
              <strong>
                <em id="userLocation">{user.location}</em>
              </strong>
            </p>
          </div>
        </div>
        <div class="col-6 col-md-9 col-lg-10 col-xl-11 userInfoContainer">
          <center>
            <div id="subHeaderUsername">{user.name}</div>
          </center>
          <div className="row">
          <em  className=" col-11 userDesc" >"{user.bio}"</em>
          </div>
          <div className="row">
            <small className="col-12">
              <div id="userCreatedAt">
                {" "}
                <b>Member Since:</b> <br />
                { user.createdAt}
              </div>
            </small>
          </div>
          {/* <Button onto="/editProfile" variant="secondary" size="sm" block>
            Edit Profile
          </Button> */}
        </div>
      </div>

      <div class="row" id="rowcss">
        <div class="col-5"> </div>
        <div class="col-7">
          <center>
            <small></small>{" "}
          </center>
        </div>
      </div>

      <div class="row" id="rowcss1">
        <div class="col-6">
          <a href="/friends" className="col-12" id="userFriends">
            {" "}
            Friends {user.friends.length}
          </a>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          {user.friends.some(el => el._id === userState._id)
          ? 
          <div className="col"></div>
          : user._id === userState._id
          ? <Link
          to={{ pathname: "/editprofile", state: { ...user } }}
          className=" buttons edit-profile"
          >
          Edit Profile
        </Link>
          : <AddFriendBtn state={({...user})}/>
        }
        {/* {userState.loggedIn ? (
            <Nav/>
          ) : (
            <NoNav/>
          )} */}

          {/* <Link
            to={{ pathname: "/editprofile", state: { ...user } }}
            className=" buttons edit-profile"
          >
            Edit Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
}
