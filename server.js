const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("./passport");

const mongoose = require("mongoose");
const db = require("./model");

// connect mongoose db (options to remove depracation warnings)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/user_auth_mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const mongoose_db = mongoose.connection;


// static assets
app.use(express.static(path.join(__dirname, "public")));

// middleware for parsing req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handling session
app.use(session({
  saveUninitialized: false,
  resave: false,
  // unset: "destroy", // session will be deleted when the response ends
  secret: "secret", // not positive what this does
  store: new MongoStore({mongooseConnection: mongoose_db, secret: "Secret"}), // enables transparent crypto in accordance with OWASP
  cookie: {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 1000*60*60*24 // this is in milliseconds (this is 24 hours)
  }
}))

// passport middlware
app.use(passport.initialize());
app.use(passport.session());


// api routes
app.use(require("./routes/api-routes"));


const PORT = process.env.PORT || 3001;


mongoose_db.once("open", function() {
  app.listen(PORT, () => {console.log("Server Listening on Port", PORT)});
})


mongoose_db.on("error", function() {
  console.error("database failed to open");
})
