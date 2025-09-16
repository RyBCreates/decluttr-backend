const Badge = require("../../models/badge");
const badges = require("./badges");

async function seedBadges() {
  try {
    for (const badge of badges) {
      await Badge.findByIdAndUpdate(badge._id, badge, {
        upsert: true,
        new: true,
      });
    }

    console.log("Badges seeded successfully!");
  } catch (err) {
    console.error("Error seeding badges:", err);
  }
}

module.exports = { seedBadges };
