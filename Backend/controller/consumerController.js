const Product = require("../model/product");


// =====================================
// GET ALL PRODUCTS
// Consumer Only
// =====================================

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate(
        "farmer",
        "name email phone address city state farmerType farmSize farmingExperience mainCrops profilePhoto"
      )
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      message: "Products fetched successfully",
      products
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
// GET SINGLE PRODUCT
// =====================================

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    ).populate(
      "farmer",
      "name email phone address city state farmerType farmSize farmingExperience mainCrops profilePhoto"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
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


module.exports = {
  getProducts,
  getProductById
};