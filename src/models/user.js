const mongoose = require("mongoose");
const Tool = require("./tool");
const Material = require("./material");

const userSchema = new mongoose.Schema({
  // Name of the person
  name: { type: String, required: true },
  // Age of the person
  age: { type: Number, required: true },

  methods: {
    // Use a tool
    async useTool(toolName) {
      const tool = await Tool.findByName(toolName);
      if (!tool) {
        throw new Error(`Tool with name ${toolName} not found`);
      }

      try {
        await tool.useTool(this.name);
      } catch (err) {
        throw new Error(`We can't use ${tool.name}: ${err.message}`);
      }
    },

    // Return the list of all tools used by that user
    usedItems() {
      return Tool.find({ borrowedBy: this._id }).populate("name");
    },

    // Specify amount and type of material, what tools you used
    async buildSomething() {},
  },
  statics: {
    findByName(name) {
      return this.find({ name: name });
    },
  },
});

module.exports = mongoose.model("User", userSchema);
