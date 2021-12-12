const express = require("express");
const router = express.Router();

// login/landing page
// GET /
router.get("/", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// Dashboard page
// GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
module.exports = router;
