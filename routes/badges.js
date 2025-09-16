const express = require("express");
const router = express.Router();

const { getBadges } = require("../controllers/badgeController");

router.get("/", getBadges);

module.exports = router;
