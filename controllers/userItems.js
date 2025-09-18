const UserItem = require("../models/userItem");
const ShopItem = require("../models/shopItem");
const User = require("../models/user");

// Get all of the User's Items
const getUserItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const userItems = await UserItem.find({ userId }).populate("itemId");
    res.send(userItems);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Purchase an Item for the User
const purchaseItem = async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  try {
    const shopItem = await ShopItem.findById(itemId);

    if (!shopItem) {
      return res.status(404).json({ message: "Item not found in shop" });
    }

    const user = await User.findById(userId);
    if (user.gems < shopItem.cost.gems) {
      return res
        .status(400)
        .json({ message: "Not enough gems to purchase item" });
    }

    user.gems -= shopItem.cost;
    await user.save();

    let userItem = await UserItem.findOne({ userId, itemId });
    if (!userItem) {
      userItem = new UserItem({
        userId,
        itemId,
        quantity: 1,
        acquiredAt: new Date(),
      });
    } else {
      userItem.quantity += 1;
      userItem.acquiredAt = new Date();
    }
    await userItem.save();

    res.status(200).json({
      message: "Item purchased successfully!",
      userItem,
      remainingGems: user.gems,
    });
  } catch (err) {
    console.error("Error purchasing item:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserItems, purchaseItem };
