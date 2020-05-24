const express = require("express");
const passport = require("../passport");
const isAuthenticated = require("../passport/isAuthenticated");

const router = express.Router();

const db = require("../model");


router.get("/api/get", (req,res) => {
  db.User.find({}, function(err, docs) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(docs);
    }
  })
})

// route to create user
router.post("/api/create", (req,res) => {
  const {username, password} = req.body;
  
  db.User.create({username: username, password: password}, function(err, doc) {
    if (err) {
      console.error(err);
      // if the username already exists this error will be thrown
      if (err.name === "MongoError" || err.code === 11000) {
        res.status(422).json({err: "Username already exists"})
      } else {
        res.status(404).json(err);
      }
    } else {
      res.json(doc);
    }
  })
})

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


router.get("/api/protected", isAuthenticated, (req, res) => {
  res.status(200).json({msg: "you are allowed into protected route"});
})


router.get("/api/logout", isAuthenticated, (req,res) => {
  req.logOut();
  res.json({msg: "You are now logged out"});
})


module.exports = router;