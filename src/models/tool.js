const mongoose = require("mongoose");
const Item = require("./item");

const toolSchema = new mongoose.Schema(
  {
    // The purpose or use of the tool
    usage: { type: String, required: true },
    // List of users who borrowed the tool
    borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // The state of the tool (1-100)
    condition: {
      type: Number,
      default: 100,
      min: [1, "Too low"],
      max: [100, "Too high"],
    },
  },
  { discriminatorKey: "kind" }
);

// If its condition is more than 15, use it and remove 10
// Otherwise you can’t
// Receives name who used it
// Add the user to the list borrowedBy
toolSchema.methods.useTool = async function () {
  if (this.condition > 15) {
    this.condition -= 10;
    await this.save();
  } else {
    throw new Error(`${this.name}'s condition is too low, you can't use it`);
  }
};

// Add 20 to condition
toolSchema.methods.fixTool = async function () {
  this.condition = Math.min(this.condition + 20, 100);
  await this.save();
};

module.exports = Item.discriminator("Tool", toolSchema);
