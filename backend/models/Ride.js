const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Accept userId as a string
  rideType: { type: String, required: true }, // Type of ride (e.g., sedan, suv, hatchback)
  price: { type: Number, required: true }, // Total price for the ride
  createdAt: { type: Date, default: Date.now }, // Automatically set creation time
});

module.exports = mongoose.model("Ride", rideSchema);