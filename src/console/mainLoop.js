const readline = require("readline-sync");
const clear = require("console-clear");

const toolLoop = require("./tool");
const materialLoop = require("./material");
const userLoop = require("./user");
const dropDB = require("./dropDB");
const exit = require("./exit");

// Main loop
const mainLoop = async () => {
  while (true) {
    clear();
    console.log("\nOptions:");
    console.log("1. Tool");
    console.log("2. Material");
    console.log("3. User");
    console.log("4. Drop the database");
    console.log("5. Exit");

    const choice = readline.question("Choose an option: ");

    switch (choice) {
      case "1":
        await toolLoop();
        break;
      case "2":
        await materialLoop();
        break;
      case "3":
        await userLoop();
        break;
      case "4":
        await dropDB();
        break;
      case "5":
        exit();
        break;
      default:
        console.log("Invalid option. Try again.");
        break;
    }
  }
};

module.exports = mainLoop;
