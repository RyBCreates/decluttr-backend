const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const taskRouter = require("./tasks");
const achievementRouter = require("./achievements");
const userAchievementsRouter = require("./userAchievements");
const badgeRouter = require("./badges");
const userBadgesRouter = require("./userBadges");
const shopItemRouter = require("./shopItems");

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/achievements", achievementRouter);
router.use("/user-achievements", userAchievementsRouter);
router.use("/badges", badgeRouter);
router.use("/user-badges", userBadgesRouter);
router.use("/shop-items", shopItemRouter);

module.exports = router;
