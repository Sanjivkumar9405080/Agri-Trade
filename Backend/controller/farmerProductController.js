const Product = require("../model/Product");

// =====================================
// CREATE PRODUCT (Farmer Only)
// =====================================
const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Only farmers can create product listings"
      });
    }

    const {
      name,
      category,
      description,
      price,
      quantity,
      unit,
      location,
      image
    } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (price === undefined || price === null || price === "" || Number(price) < 0) {
      return res.status(400).json({ message: "Price is required and cannot be negative" });
    }

    if (quantity === undefined || quantity === null || quantity === "" || Number(quantity) < 0) {
      return res.status(400).json({ message: "Quantity is required and cannot be negative" });
    }

    if (!unit || !unit.trim()) {
      return res.status(400).json({ message: "Unit is required" });
    }

    if (!location || !location.trim()) {
      return res.status(400).json({ message: "Location is required" });
    }

    const farmerId = req.user._id || req.user.userId;
    const numQty = Number(quantity);
    const status = numQty === 0 ? "Out of Stock" : "Available";

    const product = await Product.create({
      farmer: farmerId,
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      price: Number(price),
      quantity: numQty,
      unit: unit.trim(),
      location: location.trim(),
      image: image ? image.trim() : "",
      status: status
    });

    res.status(201).json({
      message: "Product listed successfully!",
      product
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      message: "Server error creating product",
      error: error.message
    });
  }
};

// =====================================
// GET LOGGED-IN FARMER'S PRODUCTS
// =====================================
const getFarmerProducts = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Farmer access only"
      });
    }

    const farmerId = req.user._id || req.user.userId;

    const products = await Product.find({
      farmer: farmerId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products fetched successfully",
      products
    });

  } catch (error) {
    console.error("Get Farmer Products Error:", error);
    res.status(500).json({
      message: "Server error fetching products",
      error: error.message
    });
  }
};

// =====================================
// GET SINGLE FARMER PRODUCT BY ID
// =====================================
const getFarmerProductById = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Farmer access only"
      });
    }

    const farmerId = req.user._id || req.user.userId;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Security Ownership Check
    if (product.farmer.toString() !== farmerId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view this product"
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product
    });

  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({
      message: "Server error fetching product",
      error: error.message
    });
  }
};

// =====================================
// UPDATE FARMER PRODUCT
// =====================================
const updateFarmerProduct = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Only farmers can update products"
      });
    }

    const farmerId = req.user._id || req.user.userId;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Security Ownership Check
    if (product.farmer.toString() !== farmerId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to modify this product"
      });
    }

    const {
      name,
      category,
      description,
      price,
      quantity,
      unit,
      location,
      image
    } = req.body;

    if (name !== undefined) product.name = name.trim();
    if (category !== undefined) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();

    if (price !== undefined) {
      if (Number(price) < 0) {
        return res.status(400).json({ message: "Price cannot be negative" });
      }
      product.price = Number(price);
    }

    if (quantity !== undefined) {
      const numQty = Number(quantity);
      if (numQty < 0) {
        return res.status(400).json({ message: "Quantity cannot be negative" });
      }
      product.quantity = numQty;
      product.status = numQty === 0 ? "Out of Stock" : "Available";
    }

    if (unit !== undefined) product.unit = unit.trim();
    if (location !== undefined) product.location = location.trim();
    if (image !== undefined) product.image = image.trim();

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      message: "Server error updating product",
      error: error.message
    });
  }
};

// =====================================
// DELETE FARMER PRODUCT
// =====================================
const deleteFarmerProduct = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Only farmers can delete products"
      });
    }

    const farmerId = req.user._id || req.user.userId;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Security Ownership Check
    if (product.farmer.toString() !== farmerId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to modify this product"
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      message: "Server error deleting product",
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getFarmerProducts,
  getFarmerProductById,
  updateFarmerProduct,
  deleteFarmerProduct
};
