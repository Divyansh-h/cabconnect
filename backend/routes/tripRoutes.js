const express = require("express");
const Trip = require("../models/Trip");

const router = express.Router();

// Create a new trip
router.post("/", async (req, res) => {
  try {
    const { userId, tripType, dateTime } = req.body;

    // Validate required fields
    if (!userId || !tripType || !dateTime) {
      return res.status(400).json({ error: "userId, tripType, and dateTime are required." });
    }

    // Validate tripType
    const validTripTypes = ["one-way", "round-trip", "ride-sharing"];
    if (!validTripTypes.includes(tripType)) {
      return res.status(400).json({ error: "Invalid tripType." });
    }

    // Create and save the trip
    const trip = new Trip({ userId, tripType, dateTime });
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error("Error saving trip:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const trip = await Trip.findByIdAndUpdate(id, updates, { new: true });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error("Error updating trip:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;