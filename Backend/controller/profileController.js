const User = require("../model/User");


// =====================================
// GET MY PROFILE
// =====================================

const getProfile = async (req, res) => {
  try {

    const userId = req.user._id || req.user.userId;
    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// =====================================
// UPDATE MY PROFILE
// =====================================

const updateProfile = async (req, res) => {
  try {

    const userId = req.user._id || req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    // Common fields
    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }

    if (req.body.address !== undefined) {
      user.address = req.body.address;
    }

    if (req.body.city !== undefined) {
      user.city = req.body.city;
    }

    if (req.body.state !== undefined) {
      user.state = req.body.state;
    }

    if (req.body.pincode !== undefined) {
      user.pincode = req.body.pincode;
    }

    if (req.body.profilePhoto !== undefined) {
      user.profilePhoto = req.body.profilePhoto;
    }


    // Farmer fields
    if (user.role === "farmer") {

      if (req.body.farmerType !== undefined) {
        user.farmerType = req.body.farmerType;
      }

      if (req.body.farmSize !== undefined) {
        user.farmSize = req.body.farmSize;
      }

      if (req.body.farmingExperience !== undefined) {
        user.farmingExperience =
          req.body.farmingExperience;
      }

      if (req.body.mainCrops !== undefined) {
        user.mainCrops = req.body.mainCrops;
      }
    }


    // Consumer fields
    if (user.role === "consumer") {

      if (req.body.consumerType !== undefined) {
        user.consumerType = req.body.consumerType;
      }

      if (req.body.businessName !== undefined) {
        user.businessName = req.body.businessName;
      }

      if (req.body.businessType !== undefined) {
        user.businessType = req.body.businessType;
      }

      if (req.body.deliveryAddress !== undefined) {
        user.deliveryAddress =
          req.body.deliveryAddress;
      }
    }


    await user.save();


    const updatedUser = await User.findById(
      user._id
    ).select("-password");


    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// =====================================
// GET USER PROFILE BY ID
// =====================================

const getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  getProfile,
  updateProfile,
  getUserById
};