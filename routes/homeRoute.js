const express = require("express");
const router = express.Router();

// login/landing page
// GET /
router.get("/", (req, res) => {
  res.send("Login");
});

// Dashboard page
// GET /dashboard
router.get("/dashboard", (req, res) => {
  res.send("dashboard");
});
module.exports = router;
