import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
      <div className="product-details-wrapper">
        <Navbar />
        <div className="product-details-page">
          <div className="product-details-message">
            <div className="loading-spinner">⏳</div>
            <h2>Loading product details...</h2>
            <p>Fetching fresh agricultural produce data directly from the farmer.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-wrapper">
        <Navbar />
        <div className="product-details-page">
          <div className="product-details-message error-state">
            <div className="message-icon">⚠️</div>
            <h2>{error}</h2>
            <p>We could not find or retrieve information for this product.</p>
            <Link to="/products" className="back-btn primary-action">
              ← Back to Products Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-wrapper">
        <Navbar />
        <div className="product-details-page">
          <div className="product-details-message">
            <div className="message-icon">🌱</div>
            <h2>Product Not Found</h2>
            <p>This product may have been sold out or removed by the seller.</p>
            <Link to="/products" className="back-btn primary-action">
              ← Back to Products Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-details-wrapper">
      <Navbar />

      <main className="product-details-page">
        <div className="product-details-inner-container">
          {/* BREADCRUMB / BACK NAVIGATION */}
          <nav className="product-details-header" aria-label="Breadcrumb">
            <Link to="/products" className="back-btn">
              ← Back to Products
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          {/* MAIN PRODUCT CONTAINER */}
          <div className="product-details-container">
            {/* PRODUCT IMAGE GALLERY / PREVIEW */}
            <div className="product-details-image-wrapper">
              <div className="product-details-image">
                {product.image ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() =>
                        setPreviewImage({
                          url: product.image,
                          title: product.name,
                        })
                      }
                      title="Click to view full size image"
                    />
                    <div className="image-zoom-hint" onClick={() => setPreviewImage({ url: product.image, title: product.name })}>
                      🔍 Tap to expand
                    </div>
                  </>
                ) : (
                  <div className="no-image-placeholder">
                    <span>🌾</span>
                    <p>Direct Farm Harvest</p>
                  </div>
                )}
              </div>
            </div>

            {/* PRODUCT INFORMATION */}
            <div className="product-details-info">
              <div className="product-category-row">
                <span className="product-category">
                  {product.category || "Agricultural Product"}
                </span>
                {product.quantity > 0 ? (
                  <span className="stock-badge in-stock">
                    ● In Stock ({product.quantity} {product.unit || "kg"})
                  </span>
                ) : (
                  <span className="stock-badge out-of-stock">
                    ● Out of Stock
                  </span>
                )}
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="product-details-price">
                ₹{product.price}
                <span className="price-unit"> / {product.unit || "kg"}</span>
              </div>

              <div className="product-description-box">
                <h4>Crop & Harvest Details</h4>
                <p className="product-details-description">
                  {product.description || "Fresh agricultural produce grown with care and sold directly by the farmer."}
                </p>
              </div>

              {/* SPECIFICATION META */}
              <div className="product-details-meta">
                <div className="meta-item">
                  <span className="meta-icon">📦</span>
                  <div>
                    <span className="meta-label">Available Quantity</span>
                    <strong className="meta-val">{product.quantity} {product.unit || "kg"}</strong>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">📍</span>
                  <div>
                    <span className="meta-label">Farm / Pickup Location</span>
                    <strong className="meta-val">{product.location || "Location not specified"}</strong>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">🌱</span>
                  <div>
                    <span className="meta-label">Category</span>
                    <strong className="meta-val">{product.category || "General Crop"}</strong>
                  </div>
                </div>
              </div>

              {/* FARMER SELLER CARD */}
              {product.farmer && (
                <div className="seller-section">
                  <h3 className="seller-heading">👨‍🌾 Seller Information</h3>

                  <div className="seller-card">
                    <div className="seller-avatar">👨‍🌾</div>

                    <div className="seller-info">
                      <h3>{product.farmer.name || "Farmer"}</h3>
                      {product.farmer.location && (
                        <p className="seller-location">
                          📍 {product.farmer.location}
                        </p>
                      )}
                      {product.farmer.phone && (
                        <p className="seller-phone">
                          📞 <a href={`tel:${product.farmer.phone}`}>{product.farmer.phone}</a>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedFarmer(product.farmer)}
                      className="profile-btn"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="product-detail-actions">
                <button
                  type="button"
                  className="buy-btn"
                  onClick={() => alert("Direct online checkout is coming soon! You can contact the farmer directly via phone.")}
                >
                  🛒 Buy Product
                </button>

                {product.farmer?.phone ? (
                  <a
                    href={`tel:${product.farmer.phone}`}
                    className="contact-btn"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  >
                    📞 Call Farmer ({product.farmer.phone})
                  </a>
                ) : (
                  <button
                    type="button"
                    className="contact-btn"
                    onClick={() => setSelectedFarmer(product.farmer)}
                  >
                    📞 Contact Farmer
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <section className="product-reviews">
            <div className="reviews-header">
              <h2>⭐ Farmer Reviews & Ratings</h2>
              <p>Transparent feedback from verified buyers across India.</p>
            </div>

            <div className="empty-reviews">
              <span className="reviews-empty-icon">💬</span>
              <h3>No reviews yet</h3>
              <p>
                Reviews will appear here after customers purchase this harvest directly from the farmer.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* FARMER PROFILE MODAL */}
      {selectedFarmer && (
        <FarmerProfileModal
          farmer={selectedFarmer}
          onClose={() => setSelectedFarmer(null)}
        />
      )}

      {/* FULLSIZE IMAGE MODAL */}
      <ImageModal
        imageUrl={previewImage?.url}
        title={previewImage?.title}
        onClose={() => setPreviewImage(null)}
      />

      <Footer />
    </div>
  );
}

export default ProductDetails;