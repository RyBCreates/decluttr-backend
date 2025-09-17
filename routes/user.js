const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  getCurrentUser,
  updateCurrentUser,
  updateUserStats,
} = require("../controllers/usersController");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);
router.patch("/stats", auth, updateUserStats);

module.exports = router;
