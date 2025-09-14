const User = require("../models/user");

// Get User by ID
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findOneById(userId).then((user) => {
    res.send(user);
  });
};

module.exports = { getCurrentUser };
