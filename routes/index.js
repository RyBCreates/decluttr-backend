const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const taskRouter = require("./tasks");
const achievementRouter = require("./achievements");
const badgeRouter = require("./badges");
const shopItemRouter = require("./shopItems");

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/achievements", achievementRouter);
router.use("/badges", badgeRouter);
router.use("/shop-items", shopItemRouter);

module.exports = router;
