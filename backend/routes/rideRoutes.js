const express = require("express");
const Ride = require("../models/Ride");

const router = express.Router();

// Save a new ride
router.post("/", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Debug: Log the incoming request data

    const { userId, rideType, price } = req.body;

    // Validate required fields
    if (!userId || !rideType || !price) {
      console.error("Validation failed: Missing required fields."); // Debug: Log validation failure
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save the ride
    console.log("Saving ride to database..."); // Debug: Log before saving to database
    const ride = new Ride({ userId, rideType, price });
    await ride.save();
    console.log("Ride saved successfully:", ride); // Debug: Log successful save
    res.status(201).json(ride);
  } catch (err) {
    console.error("Error saving ride:", err.message); // Debug: Log error message
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;