// this will be a file that pre populates the database

const mongoose = require("mongoose");

const db = require("./model");

// connect mongoose db (options to remove depracation warnings)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/calendar", {
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
      username: "a", 
      password: "123"
    },
    {
      username: "b", 
      password: "123"
    }
  ], function(err, docs) {
    if (err) {
      throw err;
    } else {
      console.log(docs);
    }
  })
})

return;