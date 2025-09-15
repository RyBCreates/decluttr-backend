const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:{
      validator:(v)=> isEmail(v),
      message: "wrong email format"
    }
  },
});

module.exports = mongoose.model("User", userSchema);
