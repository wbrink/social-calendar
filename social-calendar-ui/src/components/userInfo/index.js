import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  Link
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style.css";

export default function UserInfo(props) {
  let { user } = useParams();

  return (

    <div id="main">
      <div class="row" id="rowcss">
        <div class="col-3">
          <a href="/editprofilepic"><img id="profilepic" src="https://via.placeholder.com/90" /></a>
        </div>
        <div class="col-1"></div>
        <div class="col-8">
          <center>
            <p class="text-uppercase">
              <h4>username {props.state.user.username}</h4>
            </p>
          </center>
          <Link to={{pathname: "/editprofile", state: {...props.state.user}}} className="buttons edit-profile">Edit Profile</Link>
          {/* <Button onto="/editProfile" variant="secondary" size="sm" block>
            Edit Profile
          </Button> */}
        </div>
      </div>

      <div class="row" id="rowcss">
        <div class="col-2">
          {" "}
          <center>
            <strong>
              <em>Name {props.state.user.name}</em>
            </strong>
          </center>
        </div>
        <div class="col-4"></div>
        <div class="col-6">
          <center>
            <small>
              <strong>
                <em>Location {props.state.user.location}</em>
              </strong>
            </small>{" "}
          </center>
        </div>
      </div>
      <div class="row" id="rowcss">
        {props.state.user.bio}
      </div>

      <div class="row" id="rowcss1">
        <div class="col-4">
          <a href="/friends"> Friends {props.state.user.friends.length}</a>
        </div>
        <div class="col-2"></div>
        <div class="col-6">
          <a href="/friends">
            {" "}
            <small>
              <strong>Date Created {props.state.user.createdAt}</strong>
            </small>
          </a>
        </div>
      </div>
    </div>
  );
}
