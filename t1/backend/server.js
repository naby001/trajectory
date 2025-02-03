const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const inviteRoutes = require("./routes/inviteRoutes"); // ✅ Import invite routes
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to Database
connectDB()
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

console.log("✅ Server Started...");
console.log("🔑 JWT Secret Key:", process.env.JWT_SECRET ? "Set" : "Not Set");

// ✅ Load Routes
console.log("🚀 Loading API Routes...");
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/invites", inviteRoutes); // ✅ Register invite routes

// ✅ Debugging: Log all registered routes (after loading)
setTimeout(() => {
  console.log("📌 Registered Routes:");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`➡️ ${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
    }
  });
}, 1000);

// ✅ Test route to check if environment variables are loaded correctly
app.get("/api/test-env", (req, res) => {
  res.json({
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI ? "Mongo URI is set" : "Not set",
    JWT_SECRET: process.env.JWT_SECRET ? "JWT Secret is set" : "Not set",
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running!", timestamp: new Date() });
});

