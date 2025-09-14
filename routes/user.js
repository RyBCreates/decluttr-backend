const express = require("express");
const router = express.Router();

const { getCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);

module.exports = router;
