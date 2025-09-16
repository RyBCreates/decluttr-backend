const express = require("express");
const router = express.Router();

const { getShopItems } = require("../controllers/shopItemController");

router.get("/", getShopItems);

module.exports = router;
