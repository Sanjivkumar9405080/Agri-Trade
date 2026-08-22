const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createProduct,
  getFarmerProducts,
  getFarmerProductById,
  updateFarmerProduct,
  deleteFarmerProduct
} = require("../controller/farmerProductController");

// All farmer product routes require authentication
router.use(protect);

// Routes
router.post("/", createProduct);
router.get("/", getFarmerProducts);
router.get("/:id", getFarmerProductById);
router.put("/:id", updateFarmerProduct);
router.delete("/:id", deleteFarmerProduct);

module.exports = router;
