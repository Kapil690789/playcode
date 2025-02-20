// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};