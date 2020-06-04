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
      <div class="row">username</div>
      <div class="row">Edit Profile Button</div>
      <div class="row">UserName</div>
      <div class="row">Location </div>
      <div class="row">Bio</div>
      <div class="row"> Date Created</div>
      <div class="row">Friends</div>
    </div>
  );
}
