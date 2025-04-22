const Rating = require("../models/Rating");
const Product = require("../models/Product");
const User = require("../models/User");

const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({});
    res.status(200).json(ratings);
  } catch {
    res.status(500).send("Server error");
  }
};

// Add a rating for a product
const addRating = async (req, res) => {
  try {
    const { userId, productId, rating } = req.body;

    // Validate the rating value
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new rating
    const newRating = new Rating({ user: userId, product: productId, rating });
    await newRating.save();

    res
      .status(201)
      .json({ message: "Rating added successfully", rating: newRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all ratings for a product
const getRatingsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find ratings for the product
    const ratings = await Rating.find({ product: productId }).populate(
      "user",
      "name email"
    );

    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addRating, getRatingsForProduct, getAllRatings };
