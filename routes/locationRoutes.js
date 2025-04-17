const express = require("express");
const Location = require("../models/Location");

const router = express.Router();

// Create a new location
router.post("/", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Debug: Log the incoming request data

    const { userId, startLocation, endLocation, distanceInKm } = req.body;

    // Validate required fields
    if (!userId || !startLocation || !endLocation || !distanceInKm) {
      console.error("Validation failed: Missing required fields."); // Debug: Log validation failure
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save the location
    console.log("Saving location to database..."); // Debug: Log before saving to database
    const location = new Location({ userId, startLocation, endLocation, distanceInKm });
    await location.save();
    console.log("Location saved successfully:", location); // Debug: Log successful save
    res.status(201).json(location);
  } catch (err) {
    console.error("Error saving location:", err.message); // Debug: Log error message
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found." });
    }
    res.status(200).json(location);
  } catch (err) {
    console.error("Error fetching location:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;