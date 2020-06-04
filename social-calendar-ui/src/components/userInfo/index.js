import React, {useState, useEffect, useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

export default function UserInfo(props) {
  let { user } = useParams();

  return (
    <div>UserInfo Page</div>
  )
}