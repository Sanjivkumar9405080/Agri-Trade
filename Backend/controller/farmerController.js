const Product = require("../model/product");


// =====================================
// ADD PRODUCT
// =====================================

const addProduct = async (req, res) => {
  try {

    // Farmer check
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Only farmers can sell products"
      });
    }

    const {
      name,
      description,
      category,
      price,
      quantity,
      unit,
      location,
      image
    } = req.body;


    const farmerId = req.user._id || req.user.userId;

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      price,
      quantity,
      unit,
      location,
      image,
      farmer: farmerId
    });


    res.status(201).json({
      message: "Product added successfully",
      product
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
// MY PRODUCTS
// =====================================

const getMyProducts = async (req, res) => {
  try {

    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Farmer access only"
      });
    }

    const farmerId = req.user._id || req.user.userId;

    const products = await Product.find({
      farmer: farmerId
    }).sort({
      createdAt: -1
    });


    res.status(200).json({
      products
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  addProduct,
  getMyProducts
};