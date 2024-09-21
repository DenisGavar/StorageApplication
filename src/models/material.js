const mongoose = require("mongoose");
const Item = require("./item");

const materialSchema = new mongoose.Schema(
  {
    // Name of the supplier
    supplier: { type: String, required: true },
    // Quality rating of the material
    quality: [{ type: String }],

    methods: {
      // Remove how much we are using
      async use(quantity) {
        if (this.amount >= quantity) {
          this.amount -= quantity;
          await this.save();
        } else {
          throw new Error(`Not enough ${this.name}`);
        }
      },
    },
  },
  { discriminatorKey: "kind" }
);

module.exports = Item.discriminator("Material", materialSchema);
