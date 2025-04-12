//add model logic
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
