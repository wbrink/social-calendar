// this will be a file that pre populates the database

const mongoose = require("mongoose");

const db = require("./model");

// connect mongoose db (options to remove depracation warnings)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/user_auth_mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const mongoose_db = mongoose.connection;

mongoose_db.on("error", function(err) {
  console.log(err);
})


mongoose_db.once("open",function() {
  db.User.create([
    {
      username: "bob", 
      password: "123455"
    },
    {
      username: "joe", 
      password: "123455"
    },
    {
      username: "dennis", 
      password: "123455"
    },
    {
      username: "steve", 
      password: "123455"
    }
  ], function(err, docs) {
    if (err) {
      throw err;
    } else {
      console.log(docs);
    }
  })
})