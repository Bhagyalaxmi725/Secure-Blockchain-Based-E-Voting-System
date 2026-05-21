// server.js - BlockVote Backend Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize database
require("./db/database");
// Connect to Arduino Fingerprint Sensor
const arduino = require('./utils/arduino');
arduino.connectArduino(process.env.ARDUINO_PORT || 'COM3')
  .then(() => console.log('✅ Arduino Fingerprint Sensor Ready'))
  .catch(() => console.log('⚠️ Arduino not connected - running in simulation mode'));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", require("./routes/index"));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "🗳️ BlockVote Backend API is running!",
    status: "OK",
    port: PORT,
  });
});

// Start server
app.listen(PORT, () => {
  console.log("========================================");
  console.log("  🗳️  BlockVote Backend Server Started  ");
  console.log("========================================");
  console.log(`  ➜  Server:  http://localhost:${PORT}`);
  console.log(`  ➜  API:     http://localhost:${PORT}/api`);
  console.log("  ➜  Status:  Running ✅");
  console.log("========================================");
});
