const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  image: {
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

module.exports = mongoose.model("Badge", badgeSchema);
