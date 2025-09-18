const Achievement = require("../models/achievement");
const UserAchievement = require("../models/userAchievement");

// Get all achievements with progress for the current user
getUserAchievements = async (req, res) => {
  try {
    const achievements = await UserAchievement.find({
      userId: req.user._id,
    }).populate("achievementId");
    res.send(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch user achievements" });
  }
};

// Increment progress on a specific achievement
incrementAchievementProgress = async (req, res) => {
  const { achievementId, amount = 1 } = req.body;

  try {
    let userAchievement = await UserAchievement.findOne({
      userId: req.user._id,
      achievementId,
    });

    // If achievement does not exist, create one
    if (!userAchievement) {
      userAchievement = await UserAchievement.create({
        userId: req.user._id,
        achievementId,
        progress: amount,
        completed: false,
      });
    } else {
      userAchievement.progress += amount;
    }

    // If achievement is completed - progress = goal
    const achievement = await Achievement.findById(achievementId);
    if (achievement && userAchievement.progress >= achievement.goal) {
      userAchievement.completed = true;
      userAchievement.unlockedAt = new Date();
      userAchievement.progress = achievement.goal;
    }

    await userAchievement.save();
    res.send(userAchievement);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update achievement progress" });
  }
};

module.exports = { getUserAchievements, incrementAchievementProgress };
