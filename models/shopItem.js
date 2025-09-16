const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  multiplier: {
    type: Number,
    required: false,
  },

  cost: { type: Number, required: true },
  type: {
    type: String,
    enum: ["multiplier", "cosmetic", "consumable"],
    default: "multiplier",
  },
});

module.exports = mongoose.model("ShopItem", shopItemSchema);
