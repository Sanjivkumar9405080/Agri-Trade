const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["farmer", "consumer"],
      required: true
    },

    // Common profile information
    profilePhoto: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    state: {
      type: String,
      default: ""
    },

    pincode: {
      type: String,
      default: ""
    },

    // Farmer specific
    farmerType: {
      type: String,
      default: ""
    },

    farmSize: {
      type: Number,
      default: 0
    },

    farmingExperience: {
      type: Number,
      default: 0
    },

    mainCrops: {
      type: [String],
      default: []
    },

    // Consumer specific
    consumerType: {
      type: String,
      default: ""
    },

    businessName: {
      type: String,
      default: ""
    },

    businessType: {
      type: String,
      default: ""
    },
    profileImage: {
  type: String,
  default: ""
},

    deliveryAddress: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);