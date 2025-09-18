const UserBadge = require("../models/userBadge");

const unlockBadge = async (req, res) => {
  const { userId, badgeId } = req.body;

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
