const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Wheat",
        "Rice",
        "Maize",
        "Pulses",
        "Vegetables",
        "Fruits",
        "Seeds",
        "Spices",
        "Oilseeds",
        "Other"
      ]
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "quintal", "ton", "piece", "liter"],
      default: "kg"
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);