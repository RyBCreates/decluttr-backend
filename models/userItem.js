const mongoose = require("mongoose");

const userItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: { type: String, ref: "ShopItem", required: true },
  quantity: { type: Number, default: 0 },
  acquiredAt: { type: Date, default: null },
});

userItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model("UserItem", userItemSchema);
