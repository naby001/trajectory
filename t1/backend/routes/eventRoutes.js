const express = require("express");
const { registerEvent, getRegisteredEvents } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authMiddleware, registerEvent);
router.get("/registered", authMiddleware, getRegisteredEvents);

module.exports = router;
