import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyProducts,
  addProduct
} from "../services/FarmerProductServices";

function FarmerProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "grains",
    price: "",
    quantity: "",
    unit: "kg",
    location: "",
    image: ""
  });


  // ==============================
  // FETCH PRODUCTS
  // ==============================

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data = await getMyProducts();

      setProducts(data.products || []);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load products"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==============================
  // ADD PRODUCT
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");
      setMessage("");

      const data = await addProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });

      setMessage("Product added successfully!");

      setProducts([
        data.product,
        ...products
      ]);

      setFormData({
        name: "",
        description: "",
        category: "grains",
        price: "",
        quantity: "",
        unit: "kg",
        location: "",
        image: ""
      });

      setShowForm(false);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to add product"
      );

    }
  };


  return (

    <div className="products-page">

      {/* HEADER */}

      <div className="products-header">

        <div>

          <Link
            to="/farmer-dashboard"
            className="back-btn"
          >
            ← Dashboard
          </Link>

          <h1>My Products</h1>

          <p>
            Manage the products you are selling
            directly to consumers.
          </p>

        </div>


        <button
          className="primary-btn"
          onClick={() => {
            setShowForm(!showForm);
            setMessage("");
            setError("");
          }}
        >
          {showForm
            ? "✕ Close"
            : "+ Add Product"}
        </button>

      </div>


      {/* MESSAGE */}

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {/* ==============================
          ADD PRODUCT FORM
      ============================== */}

      {showForm && (

        <div className="add-product-card">

          <h2>Add New Product</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Basmati Rice"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option value="grains">
                    Grains
                  </option>

                  <option value="vegetables">
                    Vegetables
                  </option>

                  <option value="fruits">
                    Fruits
                  </option>

                  <option value="seeds">
                    Seeds
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group full-width">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe your product..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="₹ per unit"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Available quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Unit
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >

                  <option value="kg">
                    Kilogram (kg)
                  </option>

                  <option value="quintal">
                    Quintal
                  </option>

                  <option value="ton">
                    Ton
                  </option>

                  <option value="piece">
                    Piece
                  </option>

                  <option value="liter">
                    Liter
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Farm location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Product Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  placeholder="Image URL (optional)"
                  value={formData.image}
                  onChange={handleChange}
                />

                <small>
                  We will add Cloudinary upload later.
                </small>

              </div>

            </div>


            <button
              type="submit"
              className="primary-btn"
            >
              Add Product
            </button>

          </form>

        </div>

      )}


      {/* ==============================
          PRODUCTS
      ============================== */}

      <div className="products-section">

        <h2>
          Your Products
        </h2>


        {loading ? (

          <p>Loading products...</p>

        ) : products.length === 0 ? (

          <div className="empty-products">

            <div>🌾</div>

            <h3>
              No products yet
            </h3>

            <p>
              Add your first farm product
              to start selling directly.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowForm(true)}
            >
              + Add Product
            </button>

          </div>

        ) : (

          <div className="product-grid">

            {products.map((product) => (

              <div
                className="product-card"
                key={product._id}
              >

                <div className="product-image">

                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  ) : (

                    "🌾"

                  )}

                </div>


                <div className="product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>


                  <div className="product-price">

                    ₹{product.price}

                    <span>
                      / {product.unit}
                    </span>

                  </div>


                  <div className="product-stock">

                    Available:
                    {" "}
                    {product.quantity}
                    {" "}
                    {product.unit}

                  </div>


                  <div className="product-location">

                    📍 {product.location}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default FarmerProducts;