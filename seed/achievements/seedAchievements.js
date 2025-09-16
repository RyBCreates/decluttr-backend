const Achievement = require("../../models/achievement");
const achievements = require("./achievements");

async function seedAchievements() {
  try {
    for (const achievement of achievements) {
      await Achievement.findByIdAndUpdate(achievement._id, achievement, {
        upsert: true,
      });
    }

    console.log("Achievements seeded successfully!");
  } catch (err) {
    console.error("Error seeding achievements:", err);
  }
}

module.exports = { seedAchievements };
