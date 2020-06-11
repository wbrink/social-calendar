

export function isLoggedInCB(userState, setUserState, props, cb) {
  if (userState.loggedIn === true) {
    // user is already logged in don't run api call
    cb();
    return;
  } else {
    // check if user is logged in on backend
    fetch("/api/logged-in")
      .then(response => response.json())
      .then(user => {
        if (user === false) {
          // redirect to login
          props.history.push("/login");
          return;
        } else {
          // user is logged in 
          setUserState({...userState, username: user.username, name: user.name, _id: user._id, friends: user.friends, bio: user.bio, location: user.location, events: user.events, createdAt: user.createdAt, loggedIn: true})
          cb();
          return;
        }
      })
  }
}


export function isLoggedIn(userState, setUserState, props) {
  if (userState.loggedIn === true) {
    // user is already logged in don't run api call
    return;
  } else {
    // check if user is logged in on backend
    fetch("/api/logged-in")
      .then(response => response.json())
      .then(user => {
        if (user === false) {
          // redirect to login
          props.history.push("/login");
          return;
        } else {
          console.log("this is the user object", user);
          // user is logged in 
          setUserState({...userState, username: user.username, name: user.name, _id: user._id, friends: user.friends, bio: user.bio, location: user.location, events: user.events, createdAt: user.createdAt, loggedIn: true})
        }
      })
  }
}

// if loggedin go to
export function isLoggedInURL(userState, setUserState, props, url) {
  if (userState.loggedIn === true) {
    // user is already logged in don't run api call
    return;
  } else {
    // check if user is logged in on backend
    fetch("/api/logged-in")
      .then(response => response.json())
      .then(user => {
        if (user === false) {
          // redirect to login
          return;
        } else {
          console.log("this is the user object", user);
          // user is logged in 
          setUserState({...userState, username: user.username, name: user.name, _id: user._id, friends: user.friends, bio: user.bio, location: user.location, events: user.events, createdAt: user.createdAt, loggedIn: true})
          props.history.push(url)
        }
      })
  }
}