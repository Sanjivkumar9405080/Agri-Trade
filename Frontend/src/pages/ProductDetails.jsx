import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FarmerProfileModal from "../components/FarmerProfileModal";
import ImageModal from "../components/ImageModal";
import { API_BASE_URL } from "../config/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_BASE_URL}/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load product"
          );
        }

        setProduct(data.product);
      } catch (err) {
        console.error("Product Details Error:", err);
        setError(err.message || "Unable to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-message">
        <h2>⏳ Loading product...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-message">
        <h2>⚠️ {error}</h2>

        <Link to="/products">
          ← Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-message">
        <h2>🌱 Product not found</h2>

        <Link to="/products">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      {/* HEADER */}

      <div className="product-details-header">

        <Link
          to="/products"
          className="back-btn"
        >
          ← Back to Products
        </Link>

      </div>

      {/* PRODUCT */}

      <div className="product-details-container">

        {/* IMAGE */}

        <div className="product-details-image">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onClick={() =>
                setPreviewImage({
                  url: product.image,
                  title: product.name,
                })
              }
            />
          ) : (
            <span>🌾</span>
          )}

        </div>

        {/* INFORMATION */}

        <div className="product-details-info">

          <span className="product-category">
            {product.category ||
              "Agricultural Product"}
          </span>

          <h1>{product.name}</h1>

          <p className="product-details-description">
            {product.description ||
              "Fresh agricultural product directly from farmer."}
          </p>

          {/* PRICE */}

          <div className="product-details-price">
            ₹{product.price}

            <span>
              / {product.unit || "kg"}
            </span>
          </div>

          {/* PRODUCT INFO */}

          <div className="product-details-meta">

            <div>
              📦
              <strong> Available Quantity</strong>
              <span>
                {product.quantity}{" "}
                {product.unit || "kg"}
              </span>
            </div>

            <div>
              📍
              <strong> Location</strong>
              <span>
                {product.location ||
                  "Location not available"}
              </span>
            </div>

          </div>

          {/* FARMER */}

          {product.farmer && (

            <div className="seller-section">

              <h2>
                👨‍🌾 Farmer
              </h2>

              <div className="seller-card">

                <div className="seller-avatar">
                  👨‍🌾
                </div>

                <div className="seller-info">

                  <h3>
                    {product.farmer.name ||
                      "Farmer"}
                  </h3>

                  {product.farmer.phone && (
                    <p>
                      📞 {product.farmer.phone}
                    </p>
                  )}

                  {product.farmer.location && (
                    <p>
                      📍 {product.farmer.location}
                    </p>
                  )}

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedFarmer(
                      product.farmer
                    )
                  }
                  className="profile-btn"
                >
                  View Profile
                </button>

              </div>

            </div>

          )}

          {/* ACTIONS */}

          <div className="product-detail-actions">

            <button
              type="button"
              className="buy-btn"
              onClick={() =>
                alert("Buy system coming next!")
              }
            >
              🛒 Buy Product
            </button>

            {product.farmer && (
              <button
                type="button"
                className="contact-btn"
                onClick={() =>
                  setSelectedFarmer(
                    product.farmer
                  )
                }
              >
                📞 Contact Farmer
              </button>
            )}

          </div>

        </div>

      </div>

      {/* REVIEWS */}

      <section className="product-reviews">

        <div className="section-heading">

          <div>
            <h2>
              ⭐ Reviews
            </h2>

            <p>
              See what customers say about this farmer
              and product.
            </p>
          </div>

        </div>

        <div className="empty-reviews">
          <span>💬</span>

          <h3>
            No reviews yet
          </h3>

          <p>
            Reviews will appear here after customers
            purchase this product.
          </p>
        </div>

      </section>

      {/* FARMER MODAL */}

      {selectedFarmer && (
        <FarmerProfileModal
          farmer={selectedFarmer}
          onClose={() =>
            setSelectedFarmer(null)
          }
        />
      )}

      {/* IMAGE MODAL */}

      <ImageModal
        imageUrl={previewImage?.url}
        title={previewImage?.title}
        onClose={() =>
          setPreviewImage(null)
        }
      />

    </div>
  );
}

export default ProductDetails;