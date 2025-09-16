const ShopItem = require("../models/shopItem");

// Get all Tasks
const getShopItems = async (req, res) => {
  try {
    const shopItems = await ShopItem.find();
    res.json(shopItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getShopItems };
