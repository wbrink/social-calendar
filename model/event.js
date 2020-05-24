const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  start: Date,
  end: Date,
  frequency: {
    type: String,
    match: [/single|daily|weekly|monthly|yearly/, "frequency options: single, daily, weekly, monthly, yearly"]
  },
  users: [
    {
      type: Schema.Types.ObjectId, 
      ref: "User"
    }
  ]
})


const Event = mongoose.model("Event", EventSchema);

module.exports = Event;