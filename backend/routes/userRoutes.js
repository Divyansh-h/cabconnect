const express = require("express");
const User = require("../models/User"); // Assuming you have a User model

const router = express.Router();

// Save user details
router.post("/", async (req, res) => {
  try {
    console.log("Incoming user data:", req.body); // Debug: Log incoming data

    const { clerkId, name, email, phone, profileImage } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists in the database.");
      return res.status(200).json({ message: "User already exists." });
    }

    // Create a new user
    const user = new User({ clerkId, name, email, phone, profileImage });
    await user.save();

    res.status(201).json({ message: "User created successfully.", user });
  } catch (err) {
    console.error("Error saving user:", err.message); // Debug: Log error
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;