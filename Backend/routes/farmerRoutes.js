const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addProduct,
  getMyProducts
} = require("../controller/farmerController");


// =====================================
// FARMER AUTHENTICATION
// =====================================

router.use(protect);


// =====================================
// PRODUCTS
// =====================================

// Add product
router.post(
  "/products",
  addProduct
);


// My products
router.get(
  "/products",
  getMyProducts
);


module.exports = router;