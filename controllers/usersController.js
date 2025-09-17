const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Get current user
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: "Server error" }));
};

// Create a new User (register)
const createUser = (req, res) => {
  const { username, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        username,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send({ token, user: userWithoutPassword });
    })
    .catch((err) => {
      if (err.code === 11000)
        return res.status(409).send({ message: "Email already exists" });
      res.status(400).send({ message: "Invalid data" });
    });
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.send({ token, user: userWithoutPassword });
    })
    .catch(() => {
      res.status(401).send({ message: "Incorrect email or password" });
    });
};

// Update current user
const updateCurrentUser = (req, res) => {
  const { avatar, username } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar, username },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    })
    .catch((err) => res.status(400).send({ message: "Invalid data" }));
};

module.exports = {
  getCurrentUser,
  createUser,
  loginUser,
  updateCurrentUser,
};
