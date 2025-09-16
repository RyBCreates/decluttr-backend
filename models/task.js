const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reward: {
    gems: { type: Number, default: 0, min: 0 },
    xp: { type: Number, default: 0, min: 0 },
  },
  icon: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Not a valid URL!",
    },
  },
});

module.exports = mongoose.model("Task", taskSchema);
