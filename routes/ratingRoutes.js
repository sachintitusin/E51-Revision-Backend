const express = require("express");
const {
  addRating,
  getRatingsForProduct,
  getAllRatings,
} = require("../controllers/ratingController");

const router = express.Router();

// Route to add a rating for a product
router.post("/", addRating);
router.get("/", getAllRatings);

// Route to get all ratings for a product
router.get("/:productId", getRatingsForProduct);

module.exports = router;
