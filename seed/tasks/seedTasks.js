const Task = require("../../models/task");
const tasks = require("./tasks");

async function seedTasks() {
  try {
    for (const task of tasks) {
      await Task.findByIdAndUpdate(task._id, task, { upsert: true });
    }

    console.log("Tasks seeded successfully!");
  } catch (err) {
    console.error("Error seeding tasks:", err);
  }
}

module.exports = { seedTasks };
