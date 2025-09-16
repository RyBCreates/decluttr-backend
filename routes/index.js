const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const taskRouter = require("./tasks");
const achievementRouter = require("./achievements");

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/achievements", achievementRouter);

module.exports = router;
