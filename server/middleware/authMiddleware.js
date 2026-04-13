const jwt = require('jsonwebtoken');
const User = require('../models/User')

const  protect = async (req, res, next) => {
  let token;

  // 1. Get token from header
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. If no token
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    // 5. Attach to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };