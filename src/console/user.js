const readline = require("readline-sync");
const clear = require("console-clear");

const User = require("../models/user");

const userLoop = async () => {
  while (true) {
    clear();
    console.log("\nOptions:");
    console.log("1. Create a User");
    console.log("2. Delete a User");
    console.log("3. Get information about the User");
    console.log("4. Get information about used Tools");
    console.log("5. Build something");
    console.log("6. Back");

    const choice = readline.question("Choose an option: ");

    switch (choice) {
      case "1":
        await createUser();
        break;
      case "2":
        await deleteUser();
        break;
      case "3":
        await informationUser();
        break;
      case "4":
        await informationUsedTools();
        break;
      case "5":
        await buildSomething();
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

const createUser = async () => {
  try {
    console.log("Creating...");
    const name = readline.question("Enter the name of the User: ");
    const age = readline.questionInt("Enter the age of the User: ");

    const newUser = new User({
      name: name,
      age: age,
    });
    await newUser.save();
    console.log("The User created:", newUser);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async () => {
  try {
    console.log("Deleting...");
    const name = readline.question("Enter the name of the User: ");
    const user = await User.findByName(name);
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }
    await User.findByIdAndDelete(user._id);
  } catch (err) {
    console.error(err.message);
  }
};

const informationUser = async () => {
  try {
    console.log("Information:");
    const name = readline.question("Enter the name of the User: ");
    const user = await User.findByName(name);
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }
    console.log("Information about the User: ", user);
  } catch (err) {
    console.error(err.message);
  }
};

const informationUsedTools = async () => {
  try {
    console.log("Used Tools:");
    const name = readline.question("Enter the name of the User: ");
    const user = await User.findByName(name);
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }
    usedTools = await user.usedTools();
    for (let tool of usedTools) {
      console.log(tool.name);
    }

  } catch (err) {
    console.error(err.message);
  }
};

const buildSomething = async () => {
  try {
    console.log("Building:");
    const name = readline.question("Enter the name of the User: ");
    const user = await User.findByName(name);
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }

    // Loop for Tools
    const tools = [];
    while (true) {
      console.log("\nOptions:");
      console.log("1. Enter the Tool");
      console.log("2. Next to entering Materials");
      console.log("3. Cancel");

      const choice = readline.question("Choose an option: ");

      switch (choice) {
        case "1":
          const name = readline.question("Enter the name of the Tool: ");
          tools.push(name);
          break;
        case "2":
          break;
        case "3":
          // Go back
          return;
        default:
          console.log("Invalid option. Try again.");
          break;
      }

      // Next to entering materials
      if (choice === "2") {
        break;
      }
    }

    // Loop for Materials
    const materials = [];
    while (true) {
      console.log("\nOptions:");
      console.log("1. Enter the Material");
      console.log("2. Next to building");
      console.log("3. Cancel");

      const choice = readline.question("Choose an option: ");

      switch (choice) {
        case "1":
          const materialName = readline.question(
            "Enter the name of the Material: "
          );
          const quantity = readline.questionInt(
            "Enter the quantity of the Material: "
          );
          const material = { materialName: materialName, quantity: quantity };
          materials.push(material);
          break;
        case "2":
          break;
        case "3":
          // Go back
          return;
        default:
          console.log("Invalid option. Try again.");
          break;
      }

      // Next to building
      if (choice === "2") {
        break;
      }
    }

    await user.buildSomething(tools, materials);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = userLoop;
