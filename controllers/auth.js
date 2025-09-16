const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Login function
const register = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        password: hash,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
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
        return Promise.reject(new Error("Incorrect password or email"));
      }

      res.send({
        token: "unsure what to put here yet, maybe JWT token or user ID",
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { register, login };

// Move file to middlewares folder (Fix imports using this file)
