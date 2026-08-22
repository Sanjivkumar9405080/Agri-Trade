const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  getUserById
} = require("../controller/profileController");


// All profile routes require login
router.use(protect);


// GET profile
router.get(
  "/",
  getProfile
);


// UPDATE profile
router.put(
  "/",
  updateProfile
);


// GET public user profile by ID
router.get(
  "/user/:id",
  getUserById
);


module.exports = router;