const mongoose = require("mongoose");
const User = require("./user");

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

    methods: {
      // If its condition is more than 15, use it and remove 10
      // Otherwise you can’t
      // Receives name who used it
      // Add the user to the list borrowedBy
      async useTool(userName) {
        const user = await User.findByName(userName);
        if (!user) {
          throw new Error(`User with name ${userName} not found`);
        }

        if (this.condition > 15) {
          this.condition -= 10;
          // TODO: maybe we need to check if userId already exists in the array
          this.borrowedBy.push(user._id);
          await this.save();
        } else {
          throw new Error(
            `${this.name}'s condition is too low, you can't use it`
          );
        }
      },

      // Add 20 to condition
      async fixTool() {
        this.condition = Math.min(this.condition + 20, 100);
        await this.save();
      },
    },
  },
  { discriminatorKey: "kind" }
);

module.exports = Item.discriminator("Tool", toolSchema);
