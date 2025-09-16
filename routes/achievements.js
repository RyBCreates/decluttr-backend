const express = require("express");
const router = express.Router();

const { getAchievements } = require("../controllers/achievementController");

router.get("/", getAchievements);

module.exports = router;
