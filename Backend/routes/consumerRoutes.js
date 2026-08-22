const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProducts,
  getProductById
} = require("../controller/consumerController");


// =====================================
// CONSUMER AUTHENTICATION
// =====================================

router.use(protect);


// =====================================
// PRODUCTS
// =====================================

// Get all products (matches /api/consumer/products, /api/products, /api/consumer/products/)
router.get("/", getProducts);
router.get("/products", getProducts);

// Get single product (matches /api/products/:id and /api/consumer/products/:id)
router.get("/:id", getProductById);
router.get("/products/:id", getProductById);


module.exports = router;