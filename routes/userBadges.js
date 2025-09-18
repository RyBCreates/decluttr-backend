const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getUserBadges, unlockBadge } = require("../controllers/userBadges");

router.get("/me", auth, getUserBadges);
router.patch("/unlock/:badgeId", auth, unlockBadge);

module.exports = router;
