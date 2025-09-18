const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getUserAchievements,
  incrementAchievementProgress,
} = require("../controllers/userAchievements");

router.get("/me", auth, getUserAchievements);
router.patch("/increment/:achievementId", auth, incrementAchievementProgress);

module.exports = router;
