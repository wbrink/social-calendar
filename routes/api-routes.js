const express = require("express");
const passport = require("../passport");
const isAuthenticated = require("../passport/isAuthenticated");

const router = express.Router();

const db = require("../model");



// Get all users
router.get("/api/get", (req,res) => {
  db.User.find({}, function(err, users) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(users);
    }
  })
})



// logged in user's friends
router.get("/api/friends", isAuthenticated, (req,res) => {
  res.json(req.user.friends);
})



// create user [give username and password in the body]
router.post("/api/create", (req,res) => {
  const {username, password} = req.body;
  
  db.User.create({username: username, password: password}, function(err, user) {
    if (err) {
      console.error(err);
      // if the username already exists this error will be thrown
      if (err.name === "MongoError" || err.code === 11000) {
        res.status(422).json({err: "Username already exists"})
      } else {
        res.status(404).json(err);
      }
    } else {
      // temporary redirect to login route and sends the req object with it then returns
      res.redirect(307, "/api/login");
    }
  })
})


// username: partial search [pass string and search the database for user that matches search]
router.get("/api/user-search/:username", (req,res) => {
  // using regex to search (option 'i' means case insensitive)
  const regex = new RegExp("^" + req.params.username);
  db.User.find({username: { $regex: regex, $options: "i"}}, function(err, users) {
    if (err) {
      res.json(err);
    }
    if (users.length === 0) {
      res.status(404).json({msg: "no users found"});
    }
    res.json(users);
  })
})





// login route
router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) {return next(err);}
    if (!user) {return res.status(422).json({msg: "Invalid login"})}
    req.logIn(user, function(err) {
      if (err) {return next(err);}
      // must save session before redirecting. Many web browsers will redirect before they even finish receiving the response
      //req.session.save(() => res.redirect('/profile'));
      req.session.save(() => res.json({msg: "Logged in"}))
    });
  })(req, res, next);
})



// route to delete user
router.delete("/api/delete/:id", (req,res) => {
  const id = req.params.id;

  // db.User.deleteOne({})

})


// get user's id
router.get("/api/user/:username", (req,res) => {
  db.User.findOne({username: req.params.username}, (err, user) => {
    if (err) {
      res.json({error: err})
    }
    res.json(user._id);
  })
}) 


router.get("/api/get/requests", (req,res) => {
  db.FriendRequest.find({}, (err, requests) => {
    res.json(requests);
  })
})


// pending friendRequests for logged in users
router.get("/api/requests", isAuthenticated, (req,res) => {
  db.FriendRequest.find({ $or: [{to: req.user._id}, {from: req.user._id}]}, (err, requests) => {
    const array = [];
    requests.forEach(element => {
      if (JSON.stringify(element.to) === JSON.stringify(req.user._id)) {
        let x = {toMe: true, from: element.from, date: element.date };
        array.push(x);
      } else {
        let x = {toMe: false, to: element.to, date: element.date }
        array.push(x);
      }
      });
    res.json(array); 
  })
})



// send friend request [send username of person to make request to]
router.post("/api/request", isAuthenticated, async (req,res) => {
  // first get user id from user, then 
  db.User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      res.json({error: err})
    } else {
      db.FriendRequest.create({from: req.user._id, to: user._id,}, (err, doc) => {
        if (err) {
          res.json({error: err})
        }
        res.json({msg: `Friend Request Sent To ${user.username}`})
      })
    }
  })  
})



// accept friend request



// logout [removes the session]
router.get("/api/logout", isAuthenticated, (req,res) => {
  // remove the session from the session store (save space)
  // req.logout only removes the logged in user info from the store, doesn't delete 
  req.session.destroy((err) => {
    res.json({msg: "You are now logged out"});
  })
})




// test route to see that isAuthenticated middleware works
router.get("/api/protected", isAuthenticated, (req, res) => {
  res.status(200).json({msg: "you are allowed into protected route"});
})

module.exports = router;