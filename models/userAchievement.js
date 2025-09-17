const mongoose = require("mongoose");

const userAchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  achievementId: {
    type: String,
    ref: "Achievement",
    required: true,
  },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  unlockedAt: { type: Date, default: null },
});

userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model("UserAchievement", userAchievementSchema);
