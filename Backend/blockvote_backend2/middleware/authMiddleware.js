// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Access denied. No token." });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || "blockvote_secret_2025");
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token." });
  }
};

module.exports = authMiddleware;
