const express = require("express");
const passport = require("../passport");
const isAuthenticated = require("../passport/isAuthenticated");
const mongoose = require("mongoose");

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
  db.User.find({_id: {$in: req.user.friends}}, (err, users) => {
    const array = [];
    users.forEach(obj => {
      array.push({_id: obj._id, username: obj.username});
    })
    res.json(array);
  })
})




// remove friend 
router.delete("/api/friend/:id", (req, res) => {
  const id = req.params.id;

  // db.
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
/*
    username: (type: string)
    password: (type: string)
*/
router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) {return next(err);}
    if (!user) {return res.status(422).json({msg: "Invalid login"})}
    req.logIn(user, function(err) {
      if (err) {return next(err);}
      // must save session before redirecting. Many web browsers will redirect before they even finish receiving the response
      // req.session.save(() => res.redirect('/profile'));
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
/*
    pass username into url
*/
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
        let x = {toMe: true, from: element.from, date: element.date, _id: element._id};
        array.push(x);
      } else {
        let x = {toMe: false, to: element.to, date: element.date, _id: element._id}
        array.push(x);
      }
      });
    res.json(array); 
  })
})


 
// send friend request [send username of person to make request to]
/*
    username: (type string) send the username of the person to make request to
*/
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






// friend request (reject, delete, accept)
/* 
    action: (type string) "accept", "reject", "delete"
    id: (type mongoose.Types.ObjectId) pass the _id of the friend request
*/
router.post("/api/accept-decline-request/", isAuthenticated, (req, res) => {
  const {id, action} = req.body;

  // if not the right response sent end the request
  if (!["accept", "reject", "delete"].includes(action)) {
    res.json({msg: "Please specify 'accept', 'reject', or 'delete'"})
    return;
  }

  // let mongoID = mongoose.Types.ObjectId(id);
  db.FriendRequest.findOneAndDelete({_id: id}, async function(err, request) {
    // if it was sent to me
    if (JSON.stringify(request.to) === JSON.stringify(req.user._id)) {
      if (action.toLowerCase() == "accept")  {
        const friend = request.from // user who sent the friend request
        // add each other to friends array
        await db.User.findOneAndUpdate({_id: req.user._id}, {$push: {friends: friend }});
        await db.User.findOneAndUpdate({_id: friend}, {$push: {friends: req.user._id}});
        res.json({msg: "Friend Request Accepted"})
      } else {
        // then the request is rejected
        res.json({msg: "Friend Request Rejected"})
      }
    }

    // if i want to delete friend request i sent
    if (JSON.stringify(request.from) === JSON.stringify(req.user._id)) {
      if (action.toLowerCase() == "delete") {
        res.json({msg: "Friend Request Deleted From Sender"})
      }
    }
  }) 
})




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