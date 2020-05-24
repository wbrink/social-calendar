function isAuthenticated(req,res,next) {
  if (!req.user) {
    res.json({msg: "Please Login"});
  } else {
    // then the user is logged in and can access protected route
    next();
  }
}


module.exports = isAuthenticated;