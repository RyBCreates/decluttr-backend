const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  reward: {
    gems: { type: Number, default: 0 },
    badge: { type: String, default: null },
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
