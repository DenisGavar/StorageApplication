const Item = require("../models/item");
const Tool = require("../models/tool");
const Material = require("../models/material");
const User = require("../models/user");

const dropDB = async () => {
  console.log("Drop DB...");
  try {
    await Item.collection.drop();
    await Tool.collection.drop();
    await Material.collection.drop();
    await User.collection.drop();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = dropDB;
