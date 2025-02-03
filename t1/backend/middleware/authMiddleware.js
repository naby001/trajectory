const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // ✅ Ensure Authorization header exists
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided, authorization denied' });
  }

  // ✅ Extract token from header
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next(); // Proceed to next middleware/route
  } catch (error) {
    // ✅ Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token. Please log in again." });
    } else {
      return res.status(401).json({ msg: "Token verification failed." });
    }
  }
};
