const mongoose = require("mongoose");
const validator = require("validator");

// For validation of singular emoji
const emojiRegex = /\p{Emoji}/u;

const taskSchema = new mongoose.Schema({
  _id: { type: String, required: true },
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
        // (Maybe switch to JUST urls in future)
        return validator.isURL(value) || emojiRegex.test(value);
      },
      message: "Not a valid URL!",
    },
  },
});

module.exports = mongoose.model("Task", taskSchema);
