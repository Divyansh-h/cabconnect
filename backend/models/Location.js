const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ID as a string
  startLocation: { type: String, required: true }, // Source address
  endLocation: { type: String, required: true }, // Destination address
  distanceInKm: { type: Number, required: true }, // Distance in kilometers
  createdAt: { type: Date, default: Date.now } // Automatically set creation time
});

module.exports = mongoose.model("Location", locationSchema);