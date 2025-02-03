const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // ✅ Fix: Accept token from 'Authorization' header
  const token = req.header('Authorization')?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
