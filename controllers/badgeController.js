const Badge = require("../models/badge");

// Get all Tasks
const getBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBadges };
