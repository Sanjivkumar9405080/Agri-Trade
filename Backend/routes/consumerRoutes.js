const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProducts,
  getProductById
} = require("../controller/consumerController");



// Consumer authentication


router.use(protect);



router.get("/", getProducts);
router.get("/products", getProducts);


router.get("/:id", getProductById);
router.get("/products/:id", getProductById);


module.exports = router;