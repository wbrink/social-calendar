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
  var date = new Date.now();
  var a = new db.User({username: "a", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bert._id, date: date}, {_id: Billy._id, date: date}], bio: "test user for us to use", location: ""})
  var Bob = new db.User({username: "Bob", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Billy = new db.User({username: "Billy", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]});
  var Julia = new db.User({username: "Julia", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Kramer = new db.User({username: "Kramer", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Michael = new db.User({username: "Michael", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Jason = new db.User({username: "Jason", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var George = new db.User({username: "George", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Jerry = new db.User({username: "Jerry", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Elaine = new db.User({username: "Elaine", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Elton = new db.User({username: "Elton", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Ernie = new db.User({username: "Ernie", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Bernie = new db.User({username: "Bernie", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Bert = new db.User({username: "Bert", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Fred = new db.User({username: "Fred", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Bo = new db.User({username: "Fred", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Bella = new db.User({username: "Bella", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}, {_id: Ernie._id, date: date}, {_id: Bob._id, date: date}]})
  var Blake = new db.User({username: "Blake", password: "123", friends: [{_id: Bob._id, date: date}, {_id: Elaine._id, date: date}]});
  
  var req1 = new db.FriendRequest({from: Kramer._id, to: a._id})
  var req2 = new db.FriendRequest({from: Bo._id, to: a._id})
  var req3 = new db.FriendRequest({from: Michael._id, to: a._id})
  var req4 = new db.FriendRequest({from: a._id, to: Bella._id})
  var req5 = new db.FriendRequest({from: a._id, to: Blake._id})




  // save the documents
  a.save((err) => {console.log(err)});
  Bob.save((err) => {console.log(err)});
  Billy.save((err) => {console.log(err)});
  Julia.save((err) => {console.log(err)});
  Kramer.save((err) => {console.log(err)});
  Michael.save((err) => {console.log(err)});
  Jason.save((err) => {console.log(err)});
  George.save((err) => {console.log(err)});
  Jerry.save((err) => {console.log(err)});
  Elaine.save((err) => {console.log(err)});
  Elton.save((err) => {console.log(err)});
  Ernie.save((err) => {console.log(err)});
  Bernie.save((err) => {console.log(err)});
  Bert.save((err) => {console.log(err)});
  Fred.save((err) => {console.log(err)});
  Bo.save((err) => {console.log(err)});
  Bella.save((err) => {console.log(err)});
  Blake.save((err) => {console.log(err)});

  req1.save((err) => {console.log(err)});
  req2.save((err) => {console.log(err)});
  req3.save((err) => {console.log(err)});
  req4.save((err) => {console.log(err)});
  req5.save((err) => {console.log(err)});


})

mongoose_db.close((err) => {
  if (err) {
    console.log(err);
  }
  console.log("closing connection");
})
return;