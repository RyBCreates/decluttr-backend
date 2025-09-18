const UserBadge = require("../models/userBadge");

// Get all of the User's Badges
const getUserBadges = async (req, res) => {
  try {
    const userId = req.user._id;
    const userBadges = await UserBadge.find({ userId }).populate("badgeId");

    res.send(userBadges);
  } catch (err) {
    console.error("Error fetching badges:", err);
    res.status(500).send({ message: "Server error" });
  }
};

// Change unlock status of a User's Badge
const unlockBadge = async (req, res) => {
  const userId = req.user._id;
  const { badgeId } = req.params;

  try {
    const badge = await UserBadge.findOne({ userId, badgeId });
    if (!badge)
      return res.status(404).json({ message: "Badge not found for user" });

    if (badge.unlocked) {
      return res.status(200).json({ message: "Badge already unlocked", badge });
    }

    badge.unlocked = true;
    badge.unlockedAt = new Date();
    await badge.save();

    res.status(200).json({ message: "Badge unlocked!", badge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { unlockBadge, getUserBadges };
