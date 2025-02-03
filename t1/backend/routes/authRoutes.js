const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Add this route to verify token
router.get('/verify-token', authMiddleware, (req, res) => {
  res.json({ msg: 'Token is valid', user: req.user });
});

module.exports = router;
