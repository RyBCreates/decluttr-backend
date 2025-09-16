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
    validate: {
      validator: (v) => isEmail(v),
      message: "wrong email format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // do not return password field by default
  },
  level: { type: String, enum: ["basic", "admin"], default: "basic" },
  xp: { type: Number, default: 0 },
  gems: { type: Number, default: 0 },
  steak: { type: Number, default: 0 },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return user; // now user is available
    });
  });
};

module.exports = mongoose.model("User", userSchema);
