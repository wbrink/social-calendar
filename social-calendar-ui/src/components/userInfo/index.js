import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

export default function UserInfo(props) {
  let { user } = useParams();

  return (
    <div id="main">
      <div class="row">username {props.state.user.username}</div>
      <div class="row">Edit Profile Button</div>
      <div class="row">Location {props.state.user.location}</div>
      <div class="row">Bio {props.state.user.bio}</div>
      <div class="row"> Date Created {props.state.user.createdAt}</div>
      <div class="row">Friends {props.state.user.friends.length}</div>
    </div>
  );
}
