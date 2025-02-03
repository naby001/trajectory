const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

console.log("✅ Server Started...");
console.log("🔑 JWT Secret Key:", process.env.JWT_SECRET || "JWT_SECRET not set");

// Load Routes
console.log("🚀 Loading API Routes...");
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);

// Debugging: Log all registered routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log("➡️ Route Registered:", middleware.route.path);
  }
});

// Test route to check if environment variables are loaded correctly
app.get("/api/test-env", (req, res) => {
  res.json({
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI ? "Mongo URI is set" : "Not set",
    JWT_SECRET: process.env.JWT_SECRET ? "JWT Secret is set" : "Not set",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
