const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {}

// Get User by ID
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findOneById(userId).then((user) => {
    res.send(user);
  });
};
// Login function
const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // the hashes didn't match, rejecting the promise
        return Promise.reject(new Error("Incorrect password or email"));
      }
      // successful authentication
      res.send({ message: "Everything good!" });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getCurrentUser, login };
