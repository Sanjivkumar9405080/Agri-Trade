import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FarmerProfileModal from "../components/FarmerProfileModal";
import ImageModal from "../components/ImageModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & filters
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Modals
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [previewImageModal, setPreviewImageModal] = useState(null);

  // =========================
  // GET PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Product Error:", err);
        setError("Unable to load products. Please check server connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const productDescription = product.description?.toLowerCase() || "";
    const productCategory = product.category?.toLowerCase() || "";
    const productLocation = product.location?.toLowerCase() || "";
    const searchText = search.toLowerCase().trim();
    const locationText = locationSearch.toLowerCase().trim();

    const matchesSearch = productName.includes(searchText) || productDescription.includes(searchText);
    const matchesLocation = productLocation.includes(locationText);
    const matchesCategory = category === "all" || productCategory === category.toLowerCase();

    return matchesSearch && matchesLocation && matchesCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setCategory("all");
  };

  return (
    <div className="products-page-wrapper">
      <Navbar />

      <main className="products-page">
        <div className="products-container">
          {/* =========================
              HEADER
          ========================= */}
          <div className="products-header">
            <div>
              <span className="products-label">🌾 DIRECT AGRICULTURAL MARKETPLACE</span>
              <h1>Farm Fresh Produce</h1>
              <p>Buy fresh crops directly from verified local farmers with zero middleman commissions.</p>
            </div>

            <Link to="/home" className="back-btn">
              ← Back to Home
            </Link>
          </div>

          {/* =========================
              SEARCH + FILTER TOOLBAR
          ========================= */}
          <div className="products-toolbar">
            {/* Product Name Search */}
            <div className="product-search">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search crops (wheat, basmati rice, potatoes...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="clear-input-btn"
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Location Search */}
            <div className="product-search">
              <span className="search-icon">📍</span>
              <input
                type="text"
                placeholder="Filter by city, state or village..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              {locationSearch && (
                <button
                  type="button"
                  className="clear-input-btn"
                  onClick={() => setLocationSearch("")}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
              aria-label="Filter products by category"
            >
              <option value="all">All Crop Categories</option>
              <option value="Wheat">🌾 Wheat</option>
              <option value="Rice">🍚 Rice</option>
              <option value="Maize">🌽 Maize</option>
              <option value="Pulses">🫘 Pulses & Dal</option>
              <option value="Vegetables">🥕 Vegetables</option>
              <option value="Fruits">🍎 Fruits</option>
              <option value="Seeds">🌱 Seeds & Fertilizers</option>
              <option value="Spices">🌶️ Spices</option>
              <option value="Oilseeds">🌻 Oilseeds</option>
              <option value="Other">Other Products</option>
            </select>
          </div>

          {/* =========================
              RESULTS SUMMARY BAR
          ========================= */}
          {!loading && !error && (
            <div className="products-result-header">
              <div className="results-count-text">
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "crop" : "crops"} available
              </div>

              {(search || locationSearch || category !== "all") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="clear-filter-btn"
                >
                  ✕ Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* =========================
              LOADING STATE
          ========================= */}
          {loading && (
            <div className="products-message">
              <div className="message-icon">⏳</div>
              <h3>Loading fresh harvest...</h3>
              <p>Fetching agricultural listings directly from local farmers.</p>
            </div>
          )}

          {/* =========================
              ERROR STATE
          ========================= */}
          {!loading && error && (
            <div className="products-message error-box">
              <div className="message-icon">⚠️</div>
              <h3>Unable to load products</h3>
              <p>{error}</p>
              <button
                type="button"
                className="primary-btn"
                onClick={() => window.location.reload()}
                style={{ marginTop: "16px" }}
              >
                Retry Loading
              </button>
            </div>
          )}

          {/* =========================
              EMPTY STATE
          ========================= */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="products-message empty-box">
              <div className="message-icon">🌾</div>
              <h3>No matching products found</h3>
              <p>Try clearing your search terms or selecting a different category.</p>
              <button
                type="button"
                className="primary-btn"
                onClick={clearFilters}
                style={{ marginTop: "16px" }}
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* =========================
              PRODUCT GRID
          ========================= */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  {/* Product Image */}
                  <div
                    className="product-image"
                    onClick={() => {
                      if (product.image) {
                        setPreviewImageModal({
                          url: product.image,
                          title: product.name,
                        });
                      }
                    }}
                    style={{
                      cursor: product.image ? "pointer" : "default",
                    }}
                    title={product.image ? "Click to view full image" : ""}
                  >
                    {product.image ? (
                      <img src={product.image} alt={product.name} loading="lazy" />
                    ) : (
                      <span className="product-fallback-icon">🌾</span>
                    )}

                    <span className="product-category-pill">
                      {product.category || "Produce"}
                    </span>
                  </div>

                  {/* Product Content */}
                  <div className="product-card-content">
                    <div className="product-card-header">
                      <h2 className="product-name" title={product.name}>
                        {product.name}
                      </h2>
                    </div>

                    <p className="product-description">
                      {product.description || "Fresh harvest grown with care and sold directly by the farmer."}
                    </p>

                    <div className="product-price-row">
                      <div className="product-price">
                        ₹{product.price}
                        <span className="product-price-unit"> / {product.unit || "kg"}</span>
                      </div>

                      <div className="stock-pill">
                        {product.quantity > 0 ? (
                          <span className="in-stock-text">
                            ● {product.quantity} {product.unit || "kg"} left
                          </span>
                        ) : (
                          <span className="out-of-stock-text">● Out of Stock</span>
                        )}
                      </div>
                    </div>

                    {product.location && (
                      <div className="product-location">
                        📍 {product.location}
                      </div>
                    )}

                    {/* Farmer Information */}
                    {product.farmer && (
                      <div className="farmer-info-compact">
                        <span className="farmer-label">
                          👨‍🌾 <strong>{product.farmer.name || "Farmer"}</strong>
                        </span>
                        {product.farmer.phone && (
                          <a
                            href={`tel:${product.farmer.phone}`}
                            className="farmer-phone-link"
                            title="Call farmer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            📞 {product.farmer.phone}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="product-actions">
                      <Link
                        to={`/products/${product._id}`}
                        className="view-product-btn"
                      >
                        View Details →
                      </Link>

                      {product.farmer && (
                        <button
                          type="button"
                          onClick={() => setSelectedFarmer(product.farmer)}
                          className="farmer-profile-btn"
                          title="View farmer credentials & background"
                        >
                          👤 Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        imageUrl={previewImageModal?.url}
        title={previewImageModal?.title}
        onClose={() => setPreviewImageModal(null)}
      />

      <Footer />
    </div>
  );
}

export default Products;