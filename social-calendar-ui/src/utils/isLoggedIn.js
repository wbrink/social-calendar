/*
  Function checks that the user is logged in (necessary incase the browser refreshes and 
  state variables move back to their default value)

  Arguments:
  1: is the user state variable
  2: setUser state variable
  3: props argument that is needed for react router dom redirecting
  4: callback
*/
function isLoggedIn(user, setUser, props, cb) {
  if (user) {
    cb();
    return;
  } else {
    fetch("/api/logged-in")
      .then(response => response.json())
      .then(user => {
        if (user === false) {
          // redirect to the login
          props.history.push("/login");
          return;
        } else {
          // successful so resolve the user object
          setUser(user);
          cb();
          return;
        }
      })
  }
}


export default isLoggedIn;