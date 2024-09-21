const readline = require("readline-sync");
const clear = require("console-clear");

const Material = require("../models/material");

const materialLoop = async () => {
  while (true) {
    clear();
    console.log("\nOptions:");
    console.log("1. Create a Material");
    console.log("2. Delete a Material");
    console.log("3. Get information about the Material");
    console.log("4. Get the cost of the Material");
    console.log("5. Add the quantity of Materials");
    console.log("6. Back");

    const choice = readline.question("Choose an option: ");

    switch (choice) {
      case "1":
        await createMaterial();
        break;
      case "2":
        await deleteMaterial();
        break;
      case "3":
        await informationMaterial();
        break;
      case "4":
        await costMaterial();
        break;
      case "5":
        await addQuantityMaterial();
        break;
      case "6":
        break;
      default:
        console.log("Invalid option. Try again.");
        break;
    }

    // Go back
    if (choice === "6") {
      break;
    }

    // Delay before the next action
    readline.keyInPause();
  }
};

const createMaterial = async () => {
  try {
    console.log("Creating...");
    const name = readline.question("Enter the name of the Material: ");
    const amount = readline.questionInt("Enter the amount of the Material: ");
    const cost = readline.questionInt("Enter the cost of the Material: ");
    const supplier = readline.question("Enter the supplier of the Material: ");
    const quality = readline.question("Enter the quality of the Material: ");

    const newMaterial = new Material({
      name: name,
      amount: amount,
      cost: cost,
      supplier: supplier,
      quality: quality,
    });
    await newMaterial.save();
    console.log("The Material created:", newMaterial);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteMaterial = async () => {
  try {
    console.log("Deleting...");
    const name = readline.question("Enter the name of the Material: ");
    const material = await Material.findByName(name);
    if (!material) {
      throw new Error(`Material with name ${name} not found`);
    }
    await Material.findByIdAndDelete(material._id);
  } catch (err) {
    console.error(err.message);
  }
};

const informationMaterial = async () => {
  try {
    console.log("Information:");
    const name = readline.question("Enter the name of the Material: ");
    const material = await Material.findByName(name);
    if (!material) {
      throw new Error(`Material with name ${name} not found`);
    }
    console.log("Information about the Material: ", material);
  } catch (err) {
    console.error(err.message);
  }
};

const costMaterial = async () => {
  try {
    console.log("Cost:");
    const name = readline.question("Enter the name of the Material: ");
    const material = await Material.findByName(name);
    if (!material) {
      throw new Error(`Material with name ${name} not found`);
    }
    console.log("Cost of the Material: ", material.worth());
  } catch (err) {
    console.error(err.message);
  }
};

const addQuantityMaterial = async () => {
  try {
    console.log("Adding quantity...");
    const name = readline.question("Enter the name of the Material: ");
    const material = await Material.findByName(name);
    if (!material) {
      throw new Error(`Material with name ${name} not found`);
    }
    const quantity = readline.questionInt(
      "Enter the added quantity of the Material: "
    );
    await material.newArrival(quantity);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = materialLoop;
