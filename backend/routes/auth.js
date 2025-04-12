const express = require("express");
const passport = require("passport");
const router = express.Router();

// Route to initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect:
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5173/",
  })
);

// Get current user route
router.get("/current_user", (req, res) => {
  res.send(req.user || null);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" });
    }
    res.redirect(
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5173/"
    );
  });
});

module.exports = router;
