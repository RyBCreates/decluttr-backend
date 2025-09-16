const ShopItem = require("../../models/shopItem");
const shopItems = require("./shopItems");

async function seedShopItems() {
  try {
    for (const shopItem of shopItems) {
      await ShopItem.findByIdAndUpdate(shopItem._id, shopItem, {
        upsert: true,
      });
    }

    console.log("Shop items seeded successfully!");
  } catch (err) {
    console.error("Error seeding shop items:", err);
  }
}

module.exports = { seedShopItems };
