

export function isLoggedInCB(userState, props, cb) {
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
          userState.logIn(user.username, user._id, true);
          cb();
          return;
        }
      })
  }
}


export function isLoggedIn(userState, props) {
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
          // user is logged in 
          userState.logIn(user.username, user._id, true);
        }
      })
  }
}