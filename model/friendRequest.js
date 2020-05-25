const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId
  },
  to: {
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    //regex to match pending, accepted, rejected
    match: [/pending|accepted|rejected/, "status must be: pending, accepted or rejected"],
    default: "pending"
  }
})

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequest;