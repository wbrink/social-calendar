const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 20,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        _id: Schema.Types.ObjectId,
        date: Date,
      },
    ],
    bio: {
      type: String,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    location: {
      type: String,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    profilePic: {
      type: String,
      maxlength: 50,
      trim: true,
      default: "/images/orangemonster.jpg"
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    createdAt: Date
  },
  { timestamps: true }
);

// pre save hook use bcrypt to hash password
UserSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next(); // must be called on mongoose middleware
});

// instance method that checks the password (method is attached to the document)
UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
