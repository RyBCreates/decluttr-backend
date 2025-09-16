const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
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
    required: true,
  },
});

module.exports = mongoose.model("ShopItem", shopItemSchema);
