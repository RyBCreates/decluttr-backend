const mongoose = require("mongoose");

const { seedTasks } = require("./tasks/seedTasks");
const { seedAchievements } = require("./achievements/seedAchievements");
const { seedBadges } = require("./badges/seedBadges");
const { seedShopItems } = require("./shopItems/seedShopItems");

const MONGODB_URI = "mongodb://127.0.0.1:27017/decluttr";

async function seedAll() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    await seedTasks();
    await seedAchievements();
    await seedBadges();
    await seedShopItems();

    console.log("All data seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
}

seedAll();
