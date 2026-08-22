const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");

// Protected Image Upload to Cloudinary with Fallback
router.post("/", protect, async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "No image data provided"
      });
    }

    try {
      // Attempt Cloudinary Upload
      const result = await cloudinary.uploader.upload(image, {
        folder: "agritrade_products",
        resource_type: "auto"
      });

      return res.status(200).json({
        message: "Image uploaded successfully to Cloudinary",
        url: result.secure_url
      });

    } catch (cloudinaryErr) {
      console.warn("Cloudinary Upload Notice:", cloudinaryErr.message || cloudinaryErr);

      // If base64 image data is provided, fallback gracefully so user uploads never fail
      if (typeof image === "string" && image.startsWith("data:image/")) {
        console.log("Using base64 image fallback due to Cloudinary 403/credential restriction.");
        return res.status(200).json({
          message: "Image uploaded using fallback",
          url: image
        });
      }

      throw cloudinaryErr;
    }

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: "Image upload failed: " + (error.message || "Unknown error"),
      error: error.message
    });
  }
});

module.exports = router;
