const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const secure = require("../middlewares/secure");
const isAdmin = require("../middlewares/isRole");
const isRole = require("../middlewares/isRole");

// Define product routes

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:productId", secure, productController.updateProduct);
router.delete("/:productId", secure, productController.deleteProduct);

module.exports = router;
