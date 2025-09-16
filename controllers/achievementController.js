const Achievement = require("../models/achievement");

// Get all Tasks
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAchievements };
