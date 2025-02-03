const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register a new user
exports.registerUser = async (req, res) => {
  try {
    let { name, email, password, university, department, universityYear } = req.body;

    // Normalize email (trim & lowercase)
    email = email.trim().toLowerCase();

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists. Please login." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      university,
      department,
      universityYear,
      invites: [], // Initialize invites array
    });

    await user.save();

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ✅ Login a user
exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize email (trim & lowercase)
    email = email.trim().toLowerCase();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ✅ Fetch user details (with invites)
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

