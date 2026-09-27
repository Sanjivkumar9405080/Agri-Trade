import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getFarmerProducts,
  deleteProduct
} from "../services/FarmerProductService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageModal from "../components/ImageModal";

function FarmerProducts() {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(location.state?.message || "");

  // Modal states
  const [deleteProductTarget, setDeleteProductTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [previewImageModal, setPreviewImageModal] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getFarmerProducts();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Unable to load your products. Please check server connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Clear message state after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const confirmDelete = async () => {
    if (!deleteProductTarget) return;

    try {
      setDeleting(true);
      setError("");
      await deleteProduct(deleteProductTarget._id);
      
      setProducts(products.filter((p) => p._id !== deleteProductTarget._id));
      setMessage("Product listing deleted successfully");
      setDeleteProductTarget(null);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Unable to delete product"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="farmer-products-page-wrapper">
      <Navbar />

      <main className="products-page">
        <div className="products-container">
          {/* HEADER */}
          <div className="products-header">
            <div>
              <Link to="/farmer-dashboard" className="back-btn">
                ← Back to Dashboard
              </Link>
              <h1 style={{ marginTop: "14px" }}>My Crop Listings</h1>
              <p>
                Manage the crops you are selling directly to consumers and retailers.
              </p>
            </div>

            <Link to="/farmer/products/create" className="primary-btn" style={{ textDecoration: "none" }}>
              + Add New Crop
            </Link>
          </div>

          {/* MESSAGES */}
          {message && (
            <div className="success-message">
              ✅ {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* PRODUCTS SECTION */}
          <div className="products-section">
            {loading ? (
              <div className="products-message">
                <div className="message-icon">⏳</div>
                <h3>Loading your crop listings...</h3>
                <p>Retrieving your inventory from database.</p>
              </div>
            ) : products.length === 0 ? (
              <div className="products-message empty-box">
                <div className="message-icon">🌾</div>
                <h3>No crop listings yet</h3>
                <p>
                  List your first harvest to start receiving inquiries and orders directly from buyers.
                </p>
                <Link
                  to="/farmer/products/create"
                  className="primary-btn"
                  style={{ textDecoration: "none", display: "inline-block", marginTop: "16px" }}
                >
                  + Add Your First Crop
                </Link>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => {
                  const isAvailable = product.quantity > 0 && product.status !== "Out of Stock";

                  return (
                    <div className="product-card" key={product._id}>
                      {/* Product Image */}
                      <div
                        className="product-image"
                        onClick={() => product.image && setPreviewImageModal({ url: product.image, title: product.name })}
                        style={{ cursor: product.image ? "pointer" : "default" }}
                        title={product.image ? "Click to view full image" : ""}
                      >
                        {product.image ? (
                          <img src={product.image} alt={product.name} />
                        ) : (
                          <span className="product-fallback-icon">🌾</span>
                        )}
                        <span className="product-category-pill">
                          {product.category || "Produce"}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="product-card-content">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span className="stock-pill">
                            <span style={{
                              color: isAvailable ? "#166534" : "#991b1b",
                              fontWeight: "700"
                            }}>
                              ● {isAvailable ? "In Stock" : "Out of Stock"}
                            </span>
                          </span>
                        </div>

                        <h2 className="product-name" title={product.name}>{product.name}</h2>

                        <p className="product-description">
                          {product.description || "Farm-fresh produce listed for direct consumer trade."}
                        </p>

                        <div className="product-price-row">
                          <div className="product-price">
                            ₹{product.price}
                            <span className="product-price-unit"> / {product.unit || "kg"}</span>
                          </div>
                          <span className="product-info-compact">
                            Stock: <strong>{product.quantity} {product.unit || "kg"}</strong>
                          </span>
                        </div>

                        {product.location && (
                          <div className="product-location">
                            📍 {product.location}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                          <button
                            type="button"
                            onClick={() => navigate(`/farmer/products/${product._id}/edit`)}
                            className="secondary-btn"
                            style={{
                              flex: 1,
                              padding: "10px",
                              fontWeight: "600",
                              cursor: "pointer",
                              textAlign: "center"
                            }}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteProductTarget(product)}
                            style={{
                              padding: "10px 16px",
                              backgroundColor: "#fef2f2",
                              color: "#dc2626",
                              border: "1px solid #fecaca",
                              borderRadius: "8px",
                              fontWeight: "600",
                              cursor: "pointer"
                            }}
                            title="Delete this listing"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteProductTarget && (
        <div className="modal-overlay">
          <div className="modal-card">
            <span style={{ fontSize: "40px", display: "block", marginBottom: "12px" }}>⚠️</span>
            <h3 style={{ fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>Delete Crop Listing?</h3>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.5", marginBottom: "20px" }}>
              Are you sure you want to remove <strong>"{deleteProductTarget.name}"</strong>? This will permanently delete this listing from the marketplace.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setDeleteProductTarget(null)}
                disabled={deleting}
                style={{ flex: 1 }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "700",
                  cursor: deleting ? "not-allowed" : "pointer"
                }}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW MODAL */}
      <ImageModal
        imageUrl={previewImageModal?.url}
        title={previewImageModal?.title}
        onClose={() => setPreviewImageModal(null)}
      />

      <Footer />
    </div>
  );
}

export default FarmerProducts;
