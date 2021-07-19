const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("./passport");

const mongoose = require("mongoose");
const db = require("./model");

// connect mongoose db (options to remove depracation warnings)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/calendar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
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
  store: new MongoStore({mongooseConnection: mongoose_db, secret: process.env.SESSION_SECRET}), // enables transparent crypto in accordance with OWASP
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("social-calendar-ui/build"));
}


// api routes
app.use(require("./routes/api-routes"));

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "/social-calendar-ui/build/index.html"));
})

const PORT = process.env.PORT || 3001;


mongoose_db.once("open", function() {
  app.listen(PORT, () => {console.log("Server Listening on Port", PORT)});
})


mongoose_db.on("error", function() {
  console.error("database failed to open");
})
