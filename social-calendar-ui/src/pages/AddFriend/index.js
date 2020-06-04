import React, {useState, useEffect, useContext, useRef} from "react";
import "./style.css";
import UserContext from "../../UserContext";
import { isLoggedIn } from "../../utils/isLoggedIn";


export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: "",
      currentFriends: [], // array of user_ids 
      sentFriendRequests: [], 
      receivedFriendRequests: [] 
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
  }

  // how to use context in class component
  static contextType = UserContext;
  

  async componentDidMount() {
    console.log("compdidmount");
    isLoggedIn(this.context, this.props);
    this.init(); // function that sets current friends and friend requests
  }

  // function that grabs the friends and the friend requests for the logged in user
  init() {
    let friends = [];
    let receivedRequests = [];
    fetch('/api/friendIDs')
    .then(response => response.json())
    .then(data => {
      friends = data;
      fetch("/api/requests-received")
        .then(response2 => response2.json())
        .then(data2 => {
          receivedRequests = data2;
          fetch("/api/requests-sent")
            .then(response3 => response3.json())
            .then(data3 => {
              this.setState({sentFriendRequests: data3, receivedFriendRequests: receivedRequests, currentFriends: friends });
            })
        })
      
    })
  }

  getFriendRequests() {
    fetch("/api/requests")
    .then(response => response.json())
    .then(data => {
      this.setState({friendRequests: data});
    })
  }

  handleButtonClick() {
  }

  sendFriendRequest(e, username, id) {
    fetch("/api/request", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username})
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({sentFriendRequests: [...this.state.sentFriendRequests, id]})
      })
  }

  handleSearchChange(e) {
    if (e.target.value == "") {
      this.setState({search: ""}, () => {
        this.setState({users: []});
      });
      return;
    }
    this.setState({search: e.target.value}, () => {
      fetch("/api/user-search", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: this.state.search})
      }).then(response => {return response.json()})
        .then(usersData => {
          if (usersData === false) {
            this.setState({users: []});
          } else {
            this.setState({users: usersData});
          }
        })
    });
    

  }


  render() {
    console.log(this.state);
    let element = [];
    // if user is not logged in don't show any of the route
    if(this.context.loggedIn === false) {
      return (
        <body></body>
      )
    }

    // show the form with please search in the middle
    if (this.state.search.length == 0) {
      return (
        <div className="body">
        <form id="search-friend-list-form" onSubmit={e => {return e.preventDefault()}}>
            <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
              <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
            <label htmlFor="search-friend-list">Search</label>
            <input type="text" onChange={(e) => {this.handleSearchChange(e)}} placeholder="Search" id="search-friend-list" name="search" autoComplete="off" />
        </form>
        <div className="friend-container">
          <ul className="list-group">
            <p> Please Search Here </p>
          </ul>
        </div>
        </div>
      )
    }


    // if users match the search
    if (this.state.users.length > 0) {


      element = this.state.users.map((user) => {
        
        // by defualt the button is add friend button
        let x = "default";
        let button = <button onClick={(e) => {this.sendFriendRequest(e, user.username, user._id)}} class="btn btn-primary">Add Friend</button>
        let buttons = [<button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-success friend-btn">Accept</button>, <button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-danger friend-btn">Reject</button>];
        let buttonSent = [<button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-danger friend-btn">Delete</button>, <button type="button" class="btn btn-outline-secondary friend-btn">Pending</button>]
        // if user is already a friend display check mark
        if (this.state.currentFriends.includes(user._id)) {
          x = "friend"
          button = <button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-success">Check Mark</button>
        } else if (this.state.receivedFriendRequests.includes(user._id)) {
          x = "received";
        } else if (this.state.sentFriendRequests.includes(user._id)) {
          x = "sent"
        }

        
        return (
          <div className="list-item">
            <li key={user._id} className='user-li'>{user.username}</li>
            {x == "default" && button}
            {x == "friend" && button}
            {x == "received" && <div>{buttons.map(btn => btn)}</div>}
            {x == "sent" && buttonSent.map(btn => btn)}
          
            {/* <button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-primary">Invite</button>
            <button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-danger">Delete Invite</button>
            <button onClick={(e) => {this.handleButtonClick(e, user._id)}} class="btn btn-success">Accept</button> */}
          </div>
        )})
    }

    return (
      <div className="body">
    
        <form id="search-friend-list-form" onSubmit={e => {return e.preventDefault()}}>
            <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
              <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
            <label htmlFor="search-friend-list">Search</label>
            <input type="text" onChange={(e) => {this.handleSearchChange(e)}} placeholder="Search" id="search-friend-list" name="search" autoComplete="off" />
        </form>

        

        <div className="friend-container">
          <ul className="list-group">
            
            {element.map(el => {
              return el;
            })}

          </ul>
        </div>

      </div>
    )
  }
}