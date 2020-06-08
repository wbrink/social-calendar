const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 20,
    trim: true
  },
  start: Date,
  end: Date,
  allday: {
    type: Boolean,
    default: false
  },
  from: Schema.Types.ObjectId
  // frequency: {
  //   type: String,
  //   match: [/single|daily|weekly|monthly|yearly/, "frequency options: single, daily, weekly, monthly, yearly"]
  // },
  // users: [
  //   {
  //     type: Schema.Types.ObjectId, 
  //     ref: "User"
  //   }
  // ]
})


const Event = mongoose.model("Event", EventSchema);

module.exports = Event;