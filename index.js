const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// parsing env
dotenv.config();

// connecting to DB
connectDB();

