const mongoose = require("mongoose");
const Tool = require("./tool");
const Material = require("./material");

const userSchema = new mongoose.Schema({
  // Name of the person
  name: { type: String, required: true, unique: true },
  // Age of the person
  age: { type: Number, required: true },
});

// Use a tool
userSchema.methods.useTool = async function (toolName) {
  const tool = await Tool.findByName(toolName);
  if (!tool) {
    throw new Error(`Tool with name ${toolName} not found`);
  }

  try {
    await tool.useTool(this.name);
    // TODO: maybe we need to check if userId already exists in the array
    tool.borrowedBy.push(this._id);
    await tool.save();
  } catch (err) {
    throw new Error(`We can't use ${toolName}: ${err.message}`);
  }
};

// Return the list of all tools used by that user
userSchema.methods.usedTools = async function () {
  return await Tool.find({ borrowedBy: this._id }).populate("borrowedBy");
};

// Specify amount and type of material, what tools you used
userSchema.methods.buildSomething = async function (tools, materials) {
  // Loop through tools and use them
  for (let toolName of tools) {
    // Use the tool
    await this.useTool(toolName);
  }

  // Loop through materials and reduce quantity
  for (let { materialName, quantity } of materials) {
    const material = await Material.findByName(materialName);
    if (!material) {
      throw new Error(`Material with name ${materialName} not found`);
    }
    await material.use(quantity);
    await material.save();
  }
};

userSchema.statics.findByName = function (name) {
  return this.findOne({ name: name });
};

module.exports = mongoose.model("User", userSchema);
