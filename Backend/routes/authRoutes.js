const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controller/authController");

const protect = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});
const roleMiddleware = require("../middleware/roleMiddleware");
router.get(
    "/farmer-only",
    protect,
    roleMiddleware("farmer"),
    (req, res) => {
        res.json({
            message: "Welcome Farmer!",
            user: req.user
        });
    }
);

module.exports = router;