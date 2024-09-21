const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const mainLoop = require("./src/console/mainLoop");

// parsing env
dotenv.config();

const startApp = async () => {
  try {
    // connecting to DB
    await connectDB();

    // The main application loop
    mainLoop();
  } catch (err) {
    console.error("Error starting the app:", err.message);
    process.exit(1);
  }
};

// Start the app
startApp();
