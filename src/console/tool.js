const readline = require("readline-sync");
const clear = require("console-clear");

const Tool = require("../models/tool");

const toolLoop = async () => {
  while (true) {
    clear();
    console.log("\nOptions:");
    console.log("1. Create a Tool");
    console.log("2. Delete a Tool");
    console.log("3. Get information about the Tool");
    console.log("4. Get the cost of the Tool");
    console.log("5. Add the quantity of Tools");
    console.log("6. Fix the Tool");
    console.log("7. Back");

    const choice = readline.question("Choose an option: ");

    switch (choice) {
      case "1":
        await createTool();
        break;
      case "2":
        await deleteTool();
        break;
      case "3":
        await informationTool();
        break;
      case "4":
        await costTool();
        break;
      case "5":
        await addQuantityTool();
        break;
      case "6":
        await fixTool();
        break;
      case "7":
        break;
      default:
        console.log("Invalid option. Try again.");
        break;
    }

    // Go back
    if (choice === "7") {
      break;
    }

    // Delay before the next action
    readline.keyInPause();
  }
};

const createTool = async () => {
  try {
    console.log("Creating...");
    const name = readline.question("Enter the name of the Tool: ");
    const amount = readline.questionInt("Enter the amount of the Tool: ");
    const cost = readline.questionInt("Enter the cost of the Tool: ");
    const usage = readline.question("Enter the purpose or use of the Tool: ");
    const condition = readline.questionInt(
      "Enter the condition (1-100) of the Tool: "
    );

    const newTool = new Tool({
      name: name,
      amount: amount,
      cost: cost,
      usage: usage,
      condition: condition,
    });
    await newTool.save();
    console.log("The Tool created:", newTool);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteTool = async () => {
  try {
    console.log("Deleting...");
    const name = readline.question("Enter the name of the Tool: ");
    const tool = await Tool.findByName(name);
    if (!tool) {
      throw new Error(`Tool with name ${name} not found`);
    }
    await Tool.findByIdAndDelete(tool._id);
  } catch (err) {
    console.error(err.message);
  }
};

const informationTool = async () => {
  try {
    console.log("Information:");
    const name = readline.question("Enter the name of the Tool: ");
    const tool = await Tool.findByName(name);
    if (!tool) {
      throw new Error(`Tool with name ${name} not found`);
    }
    console.log("Information about the Tool: ", tool);
  } catch (err) {
    console.error(err.message);
  }
};

const costTool = async () => {
  try {
    console.log("Cost:");
    const name = readline.question("Enter the name of the Tool: ");
    const tool = await Tool.findByName(name);
    if (!tool) {
      throw new Error(`Tool with name ${name} not found`);
    }
    console.log("Cost of the Tool: ", tool.worth());
  } catch (err) {
    console.error(err.message);
  }
};

const addQuantityTool = async () => {
  try {
    console.log("Adding quantity...");
    const name = readline.question("Enter the name of the Tool: ");
    const tool = await Tool.findByName(name);
    if (!tool) {
      throw new Error(`Tool with name ${name} not found`);
    }
    const quantity = readline.questionInt(
      "Enter the added quantity of the Tool: "
    );
    await tool.newArrival(quantity);
  } catch (err) {
    console.error(err.message);
  }
};

const fixTool = async () => {
  try {
    console.log("Fixing...");
    const name = readline.question("Enter the name of the Tool: ");
    const tool = await Tool.findByName(name);
    if (!tool) {
      throw new Error(`Tool with name ${name} not found`);
    }
    await tool.fixTool();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = toolLoop;
