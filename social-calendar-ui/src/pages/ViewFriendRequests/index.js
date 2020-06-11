import React, {useState, useEffect, useContext} from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import UserContext from "../../UserContext";
import { isLoggedIn, isLoggedInCB } from "../../utils/isLoggedIn";


function ViewFriendRequests(props) {
  const {userState, setUserState} = useContext(UserContext);
  const [requests, setRequests] = useState({
    sentFriendRequests: [], // array of objects {toMe: false, userID: element.to, date: element.date, _id: element._id,}
    recievedFriendRequests: [], // array of objects
    userInfo: new Map(), // Type: map  key=(id)  values = {username: (username), name: (name)})
    init: false
  })

  // if the sent or recieved button is clicked
  const [choice, setChoice] = useState("recieved") // will either be "sent" or "recieved"

  const getFriendRequests = () => {
    fetch("/api/requests-v2")
      .then(res => res.json())
      .then(data => {
        let sent = [];
        let recieved = [];
        data.forEach(element => {
          if (element.toMe) {
            recieved.push(element);
          } else {
            sent.push(element);
          }
        })
        let idArray = [];
        sent.forEach(elem => { idArray.push(elem.userID)});
        recieved.forEach(elem => { idArray.push(elem.userID)});
        fetch("/api/requests-userinfo-v2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: idArray})
        })
          .then(res => res.json())
          .then(data => {
            const userMap = new Map();
            data.forEach(user => {
              userMap.set(user._id, {username: user.username, name: user.name})
            })
            setRequests({sentFriendRequests: sent, recievedFriendRequests: recieved, init: true, userInfo: userMap})

          })
      })
  }

  const clickedUser = (e) => {
    console.log("clicked", e.target.dataset.username);
  }

  const acceptFriendRequest = (e, fromID) => {
    e.preventDefault();
    e.stopPropagation();
    
    let array = requests.recievedFriendRequests;
    fetch("/api/answer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toID: userState._id,
        fromID: fromID,
        action: "accept",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // remove id from this array
        let index = array.map(el => el.userID).indexOf(fromID);
        array.splice(index, 1);
        // must add friend to the context provider as well
        setUserState({...userState, friends: [...userState.friends, { _id: fromID, date: Date.now() }]});
        // set current components state received requests and current friends
        setRequests({...requests, recievedFriendRequests: array});
      });
  }


  const rejectFriendRequest = (e, fromID) => {
    e.preventDefault();
    e.stopPropagation();

    let array = requests.recievedFriendRequests;
    fetch("/api/answer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toID: userState._id,
        fromID: fromID,
        action: "reject",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // remove id from this array
        let index = array.map(el => el.userID).indexOf(fromID);
        array.splice(index, 1);
        
        // set current components state received requests and current friends
        setRequests({...requests, recievedFriendRequests: array});
      });
  }

  const deleteFriendRequest = (e, toID) => {
    e.preventDefault();
    e.stopPropagation();

    let array = Array.from(requests.sentFriendRequests);
    fetch("/api/answer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toID: toID,
        fromID: userState._id,
        action: "delete",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // remove id from this array
        let index = array.map(el => el.userID).indexOf(toID);
        array.splice(index, 1);

        setRequests({...requests, sentFriendRequests: array });
      });
  }


  const btnClick = (e) => {
    console.log(e.target.dataset.request);
    if (choice == "recieved" && e.target.dataset.request == "sent") {
      setChoice("sent");
    } else if(choice == "sent" && e.target.dataset.request == "recieved") {
      setChoice("recieved");
    } else {
      return;
    }
  }

  
  // redirect to login if not logged in
  useEffect(() => {
    isLoggedIn(userState, setUserState, props);
  }, [])

  // do work when the userState is logged in
  useEffect(() => {
    if (userState.loggedIn) {
      // get friend requests
      getFriendRequests();
    } else {
      return;
    }
  }, [userState])

  
  // if not logged in don't show any of the page to the user
  if(!userState.loggedIn || !requests.init) {
    return (
      <body>Hello World</body>
    )
  }

  return (
    <div className="friend-container">
      <h3 className="title">Friend Requests</h3>

      <div id="choiceBtns">
        {/* <button className={"btn " + (choice == "recieved" ? "btn-primary active": "btn-secondary")} data-request="recieved" onClick={btnClick}>Recieved</button>
        <button className={"btn " + (choice == "recieved" ? "btn-secondary": "btn-primary active")} data-request="sent" onClick={btnClick}>Sent</button> */}
        <button className={"buttons " + (choice == "recieved" ? "active": "secondary")} data-request="recieved" onClick={btnClick}>Recieved</button>
        <button className={"buttons " + (choice == "recieved" ? "secondary": "active")} data-request="sent" onClick={btnClick}>Sent</button>
      </div>
      
      <ul className="list-group">


        {/* recieved requests */}
        {choice == "recieved" && requests.recievedFriendRequests.map(el => {
          const username = requests.userInfo.get(el.userID).username;
          const name = requests.userInfo.get(el.userID).name;
          return (
            <div className="list-item" data-username={username} onClick={clickedUser}>
              <li key={el.userID} className="user-li">
                {/* ADD PROFILE PICTURE FROM MODEL BELOW */}
                <img id="friendpic" src="https://via.placeholder.com/50" data-username={username} onClick={clickedUser}/>
                <strong data-username={username} onClick={clickedUser}>{username}</strong>
                <small data-username={username} onClick={clickedUser}>({name})</small>
              </li>

              <div className="friend-actions">
                <button onClick={(e) => {acceptFriendRequest(e, el.userID)}} className="btn btn-success friend-btn">Accept</button>
                <button onClick={(e) => {rejectFriendRequest(e, el.userID)}} className="btn btn-danger friend-btn">Reject</button>,
              </div>
            </div>
          )
        })}


        {/* sent requests */}
        {choice == "sent" && requests.sentFriendRequests.map(el => {
          const username = requests.userInfo.get(el.userID).username;
          const name = requests.userInfo.get(el.userID).name;
          return (
            <div className="list-item" data-username={username} onClick={clickedUser}>
              <li key={el.userID} className="user-li">
                {/* ADD PROFILE PICTURE FROM MODEL BELOW */}
                <img id="friendpic" src="https://via.placeholder.com/50" data-username={username} onClick={clickedUser}/>
                <strong data-username={username} onClick={clickedUser}>{username}</strong>
                <small data-username={username} onClick={clickedUser}>({name})</small>
              </li>

              <div className="friend-actions">
                <button onClick={(e) => {deleteFriendRequest(e, el.userID)}} className="btn btn-danger friend-btn">Delete</button>
                <p>Pending</p>
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  )
}


export default ViewFriendRequests;