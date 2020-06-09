const express = require("express");
const passport = require("../passport");
const isAuthenticated = require("../passport/isAuthenticated");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../model");

// Get all users
router.get("/api/get", (req, res) => {
  db.User.find({}, function (err, users) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(users);
    }
  });
});

// get user by id
router.get("/api/get/:id", (req, res) => {
  db.User.findOne({_id: req.params.id}, (err, user) => {
    if (err) {
      return res.json({msg: "error"});
    } else {
      return res.json({
        _id: user._id, 
        username: user.username, 
        name: user.name, 
        bio: user.bio, 
        location: user.location, 
        friends: user.friends, 
        events: user.events, 
        createdAt: user.createdAt
      });
    }
  })
})

// get current logged in users friend ids [id, id, id...]
router.get("/api/friendIDs", isAuthenticated, (req, res) => {
  const arrayOfFriendIds = req.user.friends.map((elem) => elem._id);
  res.json(arrayOfFriendIds);
});

// logged in user's friends {_id: id, username: username, date: friendsince}
router.get("/api/friends", isAuthenticated, (req, res) => {
  const arrayOfFriendIds = req.user.friends.map((elem) => elem._id);

  // find the users
  db.User.find({ _id: { $in: arrayOfFriendIds } })
    .sort({ username: 1 })
    .exec(function (err, users) {
      const array = [];
      users.forEach((obj) => {
        let friendSince;
        for (var i = 0; i < req.user.friends.length; i++) {
          if (
            JSON.stringify(obj._id) === JSON.stringify(req.user.friends[i]._id)
          ) {
            friendSince = req.user.friends[i].date;
          }
        }
        array.push({ _id: obj._id, username: obj.username, date: friendSince, name: obj.name });
      });
      res.json(array);
    });
});

// remove friend
// pass friend ID as URL parameter
router.delete("/api/friends/:id", isAuthenticated, async (req, res) => {
  const friendID = req.params.id;

  // remove user from logged in users friends
  await db.User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { friends: { _id: friendID } } }
  );

  // remove logged in user from friendIDs friend list
  await db.User.findOneAndUpdate(
    { _id: friendID },
    { $pull: { friends: { _id: req.user._id } } }
  );

  res.json({ msg: "Friend removed successfully" });
});

// create user [give username and password in the body]
router.post("/api/create", (req, res) => {
  const { username, password } = req.body;

  db.User.create({ username: username, password: password }, function (
    err,
    user
  ) {
    if (err) {
      console.error(err);
      // if the username already exists this error will be thrown
      if (err.name === "MongoError" || err.code === 11000) {
        res.status(422).json({ err: "Username already exists" });
      } else {
        res.status(404).json(err);
      }
    } else {
      // temporary redirect to login route and sends the req object with it then returns
      res.redirect(307, "/api/login");
    }
  });
});

// username: partial search [pass string and search the database for user that matches search]
router.post("/api/user-search", isAuthenticated, (req, res) => {
  // using regex to search (option 'i' means case insensitive)
  const regex = new RegExp(
    "^" + `(?!${req.user.username})` + req.body.username
  );
  db.User.find({ username: { $regex: regex, $options: "i" } })
    .sort({ username: 1 })
    .exec(function (err, users) {
      if (err) {
        console.log("error was found in api/user-search");
        res.json(false);
        return;
      }
      if (users.length === 0) {
        res.json(false);
        return;
      }
      res.json(users);
    });
});

// route that gets the logged in user and returns the info
router.get("/api/logged-in", (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id, 
      username: req.user.username, 
      name: req.user.name, 
      bio: req.user.bio, 
      location: req.user.location, 
      friends: req.user.friends, 
      events: req.user.events, 
      createdAt: req.user.createdAt
    });
  } else {
    res.json(false);
  }
});

// login route
/*
    username: (type: string)
    password: (type: string)
*/
router.post("/api/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).json({ msg: "Invalid login" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // must save session before redirecting. Many web browsers will redirect before they even finish receiving the response
      // req.session.save(() => res.redirect('/profile'));
      req.session.save(() => {
        console.log(user);
        return res.json({
          _id: user._id, 
          username: user.username, 
          name: user.name, 
          bio: user.bio, 
          location: user.location, 
          friends: user.friends, 
          events: user.events, 
          createdAt: user.createdAt
        });
      });
    });
  })(req, res, next);
});

// route to delete user
router.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  // db.User.deleteOne({})
});

// get user's id
/*
    pass username into url
*/
router.get("/api/user/:username", (req, res) => {
  const regex = new RegExp("^" + req.params.username);
  db.User.findOne({ username: { $regex: regex, $options: "i" } }, (err, user) => {
    if (err) {
      res.json({ error: err });
    }
    res.json(user);
  });
});

// development only
// get all friend requests
router.get("/api/get/requests", (req, res) => {
  db.FriendRequest.find({}, (err, requests) => {
    res.json(requests);
  });
});

// pending friendRequests for logged in users both sent and recieved
router.get("/api/requests", isAuthenticated, (req, res) => {
  db.FriendRequest.find(
    { $or: [{ to: req.user._id }, { from: req.user._id }] },
    (err, requests) => {
      const array = [];
      requests.forEach((element) => {
        if (JSON.stringify(element.to) === JSON.stringify(req.user._id)) {
          let x = {
            toMe: true,
            from: element.from,
            date: element.date,
            _id: element._id,
          };
          array.push(x);
        } else {
          let x = {
            toMe: false,
            to: element.to,
            date: element.date,
            _id: element._id,
          };
          array.push(x);
        }
      });
      res.json(array);
    }
  );
});

// returns array of userIDs of the users that sent the logged in user a friend request
router.get("/api/requests-received", isAuthenticated, (req, res) => {
  db.FriendRequest.find({ to: req.user._id }, (err, requests) => {
    if (err) {
      res.json(err);
      return;
    }
    const array = [];
    requests.forEach((element) => {
      let x = element.from; // user id of the person who sent the friend request
      array.push(x);
    });
    res.json(array); //
  });
});

router.get("/api/requests-sent", isAuthenticated, (req, res) => {
  db.FriendRequest.find({ from: req.user._id }, (err, requests) => {
    if (err) {
      res.json(err);
      return;
    }
    const array = [];
    requests.forEach((element) => {
      let x = element.to; // user id of the person who sent the friend request
      array.push(x);
    });
    res.json(array); //
  });
});

// send friend request [send username of person to make request to]
/*
    username: (type string) send the username of the person to make request to
*/
router.post("/api/request", isAuthenticated, async (req, res) => {
  // first get user id from user, then
  db.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.json({ error: err });
    } else {
      db.FriendRequest.find(
        { from: req.user._id, to: user._id },
        (err, docs) => {
          if (err) {
            res.json(err);
            return;
          } else if (docs.length > 0) {
            res.json({ msg: "Friend Request is already Pending" });
            return;
          } else {
            db.FriendRequest.create(
              { from: req.user._id, to: user._id },
              (err, doc) => {
                if (err) {
                  res.json({ error: err });
                }
                res.json({ msg: `Friend Request Sent To ${user.username}` });
              }
            );
          }
        }
      );
    }
  });
});

// friend request (reject, delete, accept)
/* 
    action: (type string) "accept", "reject", "delete"
    toID: (type mongoose.Types.ObjectId) pass the _id of the to field
    fromID: (type mongoose.Types.ObjectId) pass the _id of the from field
*/
router.post("/api/answer-request", isAuthenticated, (req, res) => {
  const { toID, fromID, action } = req.body;

  // if not the right response sent end the request
  if (!["accept", "reject", "delete"].includes(action)) {
    res.json({ msg: "Please specify 'accept', 'reject', or 'delete'" });
    return;
  }

  // let mongoID = mongoose.Types.ObjectId(id);
  db.FriendRequest.findOneAndDelete({ to: toID, from: fromID }, async function (
    err,
    request
  ) {
    if (request == null) {
      return res.json({ msg: "no results found" });
    }

    // create new date utc
    let newDate = Date.now();

    // if it was sent to me
    if (JSON.stringify(request.to) === JSON.stringify(req.user._id)) {
      if (action.toLowerCase() == "accept") {
        const friend = request.from; // user who sent the friend request
        // add each other to friends array
        await db.User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { friends: { _id: friend, date: newDate } } }
        );
        await db.User.findOneAndUpdate(
          { _id: friend },
          { $push: { friends: { _id: req.user._id, date: newDate } } }
        );
        return res.json({ msg: "Friend Request Accepted" });
      } else {
        // then the request is rejected
        return res.json({ msg: "Friend Request Rejected" });
      }
    }

    // if i want to delete friend request i sent
    if (JSON.stringify(request.from) === JSON.stringify(req.user._id)) {
      if (action.toLowerCase() == "delete") {
        return res.json({ msg: "Friend Request Deleted From Sender" });
      }
    }
  });
});

// get the calendar for loggedin user
router.get("/api/calendar/:id", isAuthenticated, (req,res) => {
  // if the id is in the friends array of objects
  const found = req.user.friends.some(el => el._id === req.params.id);

  if (req.params.id == req.user._id || found ) {
    console.log("same id in the api/calendar or is a friend");
  }
  db.User.findOne({_id: req.params.id}).populate("events").exec(function (err, user) {
    if (err) { return res.json(err)}
    res.json(user.events);
    console.log(user.events);
  })
})


// Post calendar data for logged in user
router.post("/api/calendar", isAuthenticated, (req,res) => {
  db.Event.create({title: req.body.title, start: req.body.start, end: req.body.end, from: req.user._id}, async (err, event) => {
    if (err) {
      return res.json({err: "An error occurred tyring to create an event"});
    } else {
      await db.User.findOneAndUpdate({_id: req.user._id}, {$push: {events: event._id}});
    }
    return res.json({msg: "event created successfully"})
  })
})


// update a calendar based on id
router.put("/api/calendar/:id", isAuthenticated, async (req,res) => {
  const id = req.params.id;
  await db.Event.findByIdAndUpdate({_id: id}, {title: req.body.title, start: req.body.start, end: req.body.end});
  return res.json({msg: "updated successfully"});
})

// delete an event based on id
router.delete("/api/calendar/:id", isAuthenticated, async (req,res) => {
  const id = req.params.id;
  await db.Event.findByIdAndDelete({_id: id});
  await db.User.findOneAndUpdate({_id: req.user._id}, {$pull: {events: id}} );
  return res.json({msg: "event deleted successfully"});
})





// logout [removes the session]
router.get("/api/logout", isAuthenticated, (req, res) => {
  // remove the session from the session store (save space)
  // req.logout only removes the logged in user info from the store, doesn't delete
  req.session.destroy((err) => {
    res.json({ msg: "You are now logged out" });
  });
});

// test route to see that isAuthenticated middleware works
router.get("/api/protected", isAuthenticated, (req, res) => {
  res.status(200).json({ msg: "you are allowed into protected route" });
});

module.exports = router;
