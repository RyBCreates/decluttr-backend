const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getUserItems, purchaseItem } = require("../controllers/userItems");

router.get("/me", auth, getUserItems);
router.patch("/purchase/:itemId", auth, purchaseItem);

module.exports = router;
