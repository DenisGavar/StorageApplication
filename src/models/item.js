const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // Name of the item
    name: { type: String, required: true, unique: true },
    // Quantity of the item in storage
    amount: { type: Number, default: 0 },
    // Cost of the item
    cost: { type: Number, default: 0 },
  },
  { discriminatorKey: "kind" }
);

// Return the worth of this item (amount * cost)
itemSchema.methods.worth = function () {
  return this.amount * this.cost;
};

// Add to the amount
itemSchema.methods.newArrival = async function (quantity) {
  this.amount += quantity;
  await this.save();
};

itemSchema.statics.findByName = function (name) {
  return this.findOne({ name });
};

module.exports = mongoose.model("Item", itemSchema);
