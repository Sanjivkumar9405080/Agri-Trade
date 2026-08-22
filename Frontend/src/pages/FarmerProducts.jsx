import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getFarmerProducts,
  deleteProduct
} from "../services/FarmerProductService";
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
        "Unable to load your products"
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
      setMessage("Product deleted successfully");
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
    <div className="products-page">
      {/* HEADER */}
      <div className="products-header">
        <div>
          <Link to="/farmer-dashboard" className="back-btn">
            ← Dashboard
          </Link>
          <h1 style={{ marginTop: "12px" }}>My Products</h1>
          <p>
            Manage the products you are selling directly to consumers.
          </p>
        </div>

        <Link to="/farmer/products/create" className="primary-btn" style={{ textDecoration: "none" }}>
          + Add Product
        </Link>
      </div>

      {/* MESSAGES */}
      {message && (
        <div className="success-message" style={{ padding: "14px", backgroundColor: "#dcfce7", color: "#166534", borderRadius: "10px", marginBottom: "20px" }}>
          ✅ {message}
        </div>
      )}

      {error && (
        <div className="error-message" style={{ padding: "14px", backgroundColor: "#fef2f2", color: "#b91c1c", borderRadius: "10px", marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="products-section">
        {loading ? (
          <div className="empty-state">
            <div>⏳</div>
            <h3>Loading your products...</h3>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div>🌾</div>
            <h3>No products listed yet</h3>
            <p>
              Add your first farm product to start selling directly to consumers without middlemen.
            </p>
            <Link to="/farmer/products/create" className="primary-btn" style={{ textDecoration: "none" }}>
              + Add Product
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
                    title={product.image ? "Click to enlarge image" : ""}
                  >
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span>🌾</span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="product-card-content">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span className="product-category">
                        {product.category || "Grains"}
                      </span>

                      <span style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "700",
                        backgroundColor: isAvailable ? "#dcfce7" : "#fee2e2",
                        color: isAvailable ? "#166534" : "#991b1b"
                      }}>
                        {isAvailable ? "Available" : "Out of Stock"}
                      </span>
                    </div>

                    <h2>{product.name}</h2>

                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-price">
                      ₹{product.price}
                      <span> / {product.unit || "kg"}</span>
                    </div>

                    <div className="product-info">
                      <span>Available: <strong>{product.quantity} {product.unit || "kg"}</strong></span>
                    </div>

                    {product.location && (
                      <div className="product-location">
                        📍 {product.location}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                      <button
                        onClick={() => navigate(`/farmer/products/${product._id}/edit`)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button
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

      {/* DELETE CONFIRMATION MODAL */}
      {deleteProductTarget && (
        <div className="modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            maxWidth: "420px",
            width: "100%",
            padding: "28px",
            textAlign: "center",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>⚠️</div>
            <h2 style={{ fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>
              Confirm Delete
            </h2>
            <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "24px" }}>
              Are you sure you want to delete <strong>"{deleteProductTarget.name}"</strong>?
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setDeleteProductTarget(null)}
                disabled={deleting}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLIMAGE PREVIEW MODAL */}
      <ImageModal
        imageUrl={previewImageModal?.url}
        title={previewImageModal?.title}
        onClose={() => setPreviewImageModal(null)}
      />
    </div>
  );
}

export default FarmerProducts;
