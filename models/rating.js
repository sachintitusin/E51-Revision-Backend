const mongoose = require("mongoose");

// Rating schema definition
const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating can be between 1 and 5
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Rating model from the schema
const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
