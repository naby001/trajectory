const express = require('express');
const { registerUser, loginUser, getallUseremails } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

router.post('/getallusers', getallUseremails);

// ✅ Verify Token Route
router.get('/verify-token', authMiddleware, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: req.user, // Send user details
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

module.exports = router;
