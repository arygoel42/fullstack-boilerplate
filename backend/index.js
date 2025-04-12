const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");
const passport = require("./services/passport");
const users = require("./routes/users");
const maps = require("./routes/maps");
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");

// Load environment variables
require("dotenv").config();

//add mongoose compass connection logic
//or add other database connection logic

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// Configure CORS to allow credentials
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "your-production-domain"
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Configure cookie session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.COOKIE_KEY || "temporary-dev-key"],
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello world");
});

// Routes
app.use("/api/users", users);
app.use("/api/maps", maps);
app.use("/auth", authRoutes);

app.listen(3011, () => {
  console.log("listening on port 3011");
});
