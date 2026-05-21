// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDB } = require("../db/database");

const login = (req, res) => {
  const { admin_id, password } = req.body;
  const db = getDB();
  const admin = db.admins.find(a => a.admin_id === admin_id);
  if (!admin) return res.status(401).json({ success: false, message: "Invalid Admin ID or password." });

  const isMatch = bcrypt.compareSync(password, admin.password);
  if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Admin ID or password." });

  const token = jwt.sign(
    { id: admin.id, admin_id: admin.admin_id, name: admin.name },
    process.env.JWT_SECRET || "blockvote_secret_2025",
    { expiresIn: "8h" }
  );
  res.json({ success: true, message: "Login successful", token, admin: { id: admin.id, admin_id: admin.admin_id, name: admin.name } });
};

module.exports = { login };
