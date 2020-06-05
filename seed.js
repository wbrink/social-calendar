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


mongoose_db.once("open", async function() {
  var date = Date.now();

  var a = new db.User({username: "a", password: "123", friends: [], bio: "test user for us to use", location: "Central Valley, CA"})

  var Bob = new db.User({username: "Bob", password: "123", friends: [{_id: a._id, date: date}], bio: "test bio for bob", location: "New York"})
  var Billy = new db.User({username: "Billy", password: "123", friends: [{_id: a._id, date: date}], bio: "test bio for billy", location: "New York"});
  var Julia = new db.User({username: "Julia", password: "123", friends: [], bio: "test bio for Julia", location: "New York"})
  var Kramer = new db.User({username: "Kramer", password: "123", friends: [], bio: "test bio Kramer", location: "New York"})
  var Michael = new db.User({username: "Michael", password: "123", friends: [], bio: "test bio Michael", location: "New York"})
  var Jason = new db.User({username: "Jason", password: "123", friends: [], bio: "test bio Jason", location: "New York"})
  var George = new db.User({username: "George", password: "123", friends: [], bio: "test bio George", location: "New York"})
  var Jerry = new db.User({username: "Jerry", password: "123", friends: [], bio: "test bio Jerry", location: "New York"})
  var Elaine = new db.User({username: "Elaine", password: "123", friends: [{_id: a._id, date: date}], bio: "test bio Elaine", location: "New York"})
  var Elton = new db.User({username: "Elton", password: "123", friends: [], bio: "test bio Elton", location: "New York"})
  var Ernie = new db.User({username: "Ernie", password: "123", friends: [{_id: a._id, date: date}], bio: "test bio Ernie", location: "New York"})
  var Bernie = new db.User({username: "Bernie", password: "123", friends: [], bio: "test bio Bernie", location: "New York"})
  var Bert = new db.User({username: "Bert", password: "123", friends: [{_id: a._id, date: date}], bio: "test bio Bert", location: "New York"})
  var Fred = new db.User({username: "Fred", password: "123", friends: [], bio: "test bio Fred", location: "New York"})
  var Bo = new db.User({username: "Bo", password: "123", friends: [], bio: "test bio Bo", location: "New York"})
  var Bella = new db.User({username: "Bella", password: "123", friends: [], bio: "test bio Bella", location: "New York"})
  var Blake = new db.User({username: "Blake", password: "123", friends: [], bio: "test bio Blake", location: "New York"});

  a.friends = [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bert._id, date: date}, {_id: Billy._id, date: date}];

  
  var req1 = new db.FriendRequest({from: Kramer._id, to: a._id})
  var req2 = new db.FriendRequest({from: Bo._id, to: a._id})
  var req3 = new db.FriendRequest({from: Michael._id, to: a._id})
  var req4 = new db.FriendRequest({from: a._id, to: Bella._id})
  var req5 = new db.FriendRequest({from: a._id, to: Blake._id})




  // save the documents
  try { 
    await a.save();
    await Bob.save();
    await Billy.save();
    await Julia.save();
    await Kramer.save();
    await Michael.save();
    await Jason.save();
    await George.save();
    await Jerry.save();
    await Elaine.save();
    await Elton.save();
    await Ernie.save();
    await Bernie.save();
    await Bert.save();
    await Fred.save();
    await Bo.save();
    await Bella.save();
    await Blake.save();

    await req1.save();
    await req2.save();
    await req3.save();
    await req4.save();
    await req5.save();

    mongoose_db.close((err) => {
      if (err) {
        console.log("error:", error);
      }
      console.log("closing successfully");
    })
    
  } catch (error) {
    console.log("There was an error saving to db:", error);
    mongoose_db.close((err) => {
      if (err) {
        console.log("error:", error);
      }
      console.log("closing successfully");
    })
  }

})
