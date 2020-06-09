import React from "react";
import { Redirect } from "react-router-dom";
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
      receivedFriendRequests: [],
      redirect: false,
      clickedUser: {},
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
    this.deleteFriendRequest = this.deleteFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
    this.clickedUser = this.clickedUser.bind(this);
  }

  // how to use context in class component
  static contextType = UserContext;

  async componentDidMount() {
    console.log("compdidmount");
    isLoggedIn(this.context.userState, this.context.setUserState, this.props);
    this.init(); // function that sets current friends and friend requests
  }

  // function that grabs the friends and the friend requests for the logged in user
  init() {
    let friends = [];
    let receivedRequests = [];
    fetch("/api/friendIDs")
      .then((response) => response.json())
      .then((data) => {
        friends = data;
        fetch("/api/requests-received")
          .then((response2) => response2.json())
          .then((data2) => {
            receivedRequests = data2;
            fetch("/api/requests-sent")
              .then((response3) => response3.json())
              .then((data3) => {
                this.setState({
                  sentFriendRequests: data3,
                  receivedFriendRequests: receivedRequests,
                  currentFriends: friends,
                });
              });
          });
      });
  }

  deleteFriendRequest(e, toID) {
    e.preventDefault();
    e.stopPropagation();
    let array = Array.from(this.state.sentFriendRequests);
    fetch("/api/answer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toID: toID,
        fromID: this.context.userState._id,
        action: "delete",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // remove id from this array
        let index = array.indexOf(toID);
        array.splice(index, 1);

        this.setState({ sentFriendRequests: array });
      });
  }

  acceptFriendRequest(e, fromID) {
    e.preventDefault();
    e.stopPropagation();
    let array = Array.from(this.state.receivedFriendRequests);
    fetch("/api/answer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toID: this.context.userState._id,
        fromID: fromID,
        action: "accept",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // remove id from this array
        let index = array.indexOf(fromID);
        array.splice(index, 1);

        // must add friend to the context provider as well
        const friendsArray = Array.from(this.state.currentFriends);
        this.context.setUserState({
          ...this.context.userState,
          friends: [...friendsArray, { _id: fromID, date: Date.now() }],
        });

        // set current components state received requests and current friends
        this.setState({
          receivedFriendRequests: array,
          currentFriends: [...this.state.currentFriends, fromID],
        });
      });
  }

  rejectFriendRequest(e, fromID) {
    e.preventDefault();
    e.stopPropagation();
    let array = Array.from(this.state.receivedFriendRequests);
    fetch("/api/answer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toID: this.context.userState._id,
        fromID: fromID,
        action: "reject",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // remove id from this array
        let index = array.indexOf(fromID);
        array.splice(index, 1);

        this.setState({ receivedFriendRequests: array });
      });
  }

  // send the friend request to clicked user
  sendFriendRequest(e, username, id) {
    e.preventDefault();
    e.stopPropagation();
    fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        // successful sent request
        console.log(data);
        this.setState({
          sentFriendRequests: [...this.state.sentFriendRequests, id],
        });
      });
  }

  handleSearchChange(e) {
    if (e.target.value == "") {
      this.setState({ search: "" }, () => {
        this.setState({ users: [] });
      });
      return;
    }
    this.setState({ search: e.target.value }, () => {
      fetch("/api/user-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.state.search }),
      })
        .then((response) => {
          return response.json();
        })
        .then((usersData) => {
          if (usersData === false) {
            this.setState({ users: [] });
          } else {
            this.setState({ users: usersData });
          }
        });
    });
  }

  clickedUser(e, user) {
    console.log("clicked user", user);
    this.setState({ redirect: true, clickedUser: user });
  }

  render() {
    let element = [];
    // if user is not logged in don't show any of the route
    if (this.context.userState.loggedIn === false) {
      return <body></body>;
    }

    // if redirect is true then redirect page
    if (this.state.redirect) {
      return (
        <Redirect
          to={{ pathname: "/profile", state: { user: this.state.clickedUser } }}
        />
      );
    }

    // show the form with please search in the middle
    if (this.state.search.length == 0) {
      return (
        <div className="body">
          <form
            id="search-friend-list-form"
            onSubmit={(e) => {
              return e.preventDefault();
            }}
          >
            <svg
              class="bi bi-search"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fill-rule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
            <label htmlFor="search-friend-list">Search</label>
            <input
              type="text"
              onChange={(e) => {
                this.handleSearchChange(e);
              }}
              placeholder="Search"
              id="search-friend-list"
              name="search"
              autoComplete="off"
            />
          </form>
          <div className="friend-container">
            <ul className="list-group">
              <p id="search-here"> Please Search Here </p>
            </ul>
          </div>
        </div>
      );
    }

    // if users match the search
    if (this.state.users.length > 0) {
      element = this.state.users.map((user) => {
        // by defualt the button is add friend button
        let x = "default";
        let button = (
          <button
            onClick={(e) => {
              this.sendFriendRequest(e, user.username, user._id);
            }}
            class="btn btn-primary"
          >
            Add Friend
          </button>
        );
        let buttons = [
          <button
            onClick={(e) => {
              this.acceptFriendRequest(e, user._id);
            }}
            class="btn btn-success friend-btn"
          >
            Accept
          </button>,
          <button
            onClick={(e) => {
              this.rejectFriendRequest(e, user._id);
            }}
            class="btn btn-danger friend-btn"
          >
            Reject
          </button>,
        ];
        let buttonSent = [
          <button
            onClick={(e) => {
              this.deleteFriendRequest(e, user._id);
            }}
            class="btn btn-danger friend-btn"
          >
            Delete
          </button>,
          <p>Pending</p>,
        ];
        // if user is already a friend display check mark (instead of button)
        if (this.state.currentFriends.includes(user._id)) {
          x = "friend";
          button = (
            <svg
              class="bi bi-check"
              id="current-friend"
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          );
        } else if (this.state.receivedFriendRequests.includes(user._id)) {
          x = "received";
        } else if (this.state.sentFriendRequests.includes(user._id)) {
          x = "sent";
        }

        return (
          <div className="list-item">
            <li
              key={user._id}
              onClick={(e) => {
                this.clickedUser(e, user);
              }}
              className="user-li"
            >
              {/* ADD PROFILE PICTURE FROM MODEL BELOW */}
              <img id="friendpic" src="https://via.placeholder.com/50" />
              <strong>{user.username}</strong>
              <small>({user.name})</small>
            </li>
            {x == "default" && button}
            {x == "friend" && button}
            {x == "received" && (
              <div className="friend-actions">{buttons.map((btn) => btn)}</div>
            )}
            {x == "sent" && (
              <div className="friend-actions">
                {buttonSent.map((btn) => btn)}
              </div>
            )}
          </div>
        );
      });
    }

    return (
      <div className="body">
        <form
          id="search-friend-list-form"
          onSubmit={(e) => {
            return e.preventDefault();
          }}
        >
          <svg
            class="bi bi-search"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
            />
            <path
              fill-rule="evenodd"
              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
            />
          </svg>
          <label htmlFor="search-friend-list">Search</label>
          <input
            type="text"
            onChange={(e) => {
              this.handleSearchChange(e);
            }}
            placeholder="Search"
            id="search-friend-list"
            name="search"
            autoComplete="off"
          />
        </form>

        <div className="friend-container">
          <ul className="list-group">
            {element.map((el) => {
              return el;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
