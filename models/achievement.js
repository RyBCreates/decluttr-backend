const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  name: {
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
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
