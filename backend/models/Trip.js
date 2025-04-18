const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Change from ObjectId to String
  tripType: { 
    type: String, 
    required: true, 
    enum: ["one-way", "round-trip", "ride-sharing"], // Restrict to valid trip types
  },
  dateTime: { type: Date, required: true }, // Required for trip creation
  startLocation: { type: String }, // Optional, will be added later
  endLocation: { type: String }, // Optional, will be added later
  price: { type: Number }, // Optional, will be added later
  createdAt: { type: Date, default: Date.now }, // Automatically set creation time
});

module.exports = mongoose.model("Trip", tripSchema);