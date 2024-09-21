const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // Name of the item
    name: { type: String, required: true },
    // Quantity of the item in storage
    amount: { type: Number, default: 0 },
    // Cost of the item
    cost: { type: Number, default: 0 },

    methods: {
      // Return the worth of this item (amount * cost)
      worth() {
        return this.amount * this.cost;
      },
      // Add to the amount
      async newArrival(quantity) {
        this.amount += quantity;
        await this.save();
      },
    },

    statics: {
      findByName(name) {
        return this.find({ name: name });
      },
    },
  },

  { discriminatorKey: "kind" }
);

module.exports = mongoose.model("Item", itemSchema);
