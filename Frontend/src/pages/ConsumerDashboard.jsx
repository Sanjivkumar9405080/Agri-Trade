import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import FarmerProfileModal from "../components/FarmerProfileModal";
import ImageModal from "../components/ImageModal";

function ConsumerDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [previewImageModal, setPreviewImageModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Products Error:", err);
        setError("Unable to load products. Please check connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="dashboard-page">
      {/* Mobile Topbar */}
      <div className="dashboard-mobile-topbar">
        <Link to="/home" className="mobile-dashboard-logo">
          🌾 AgriTrade
        </Link>
        <button
          className="dashboard-mobile-menu-btn"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle Dashboard Menu"
        >
          {mobileSidebarOpen ? "✕" : "☰ Menu"}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="dashboard-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`sidebar ${mobileSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/home" className="dashboard-logo" style={{ textDecoration: "none" }}>
            🌾 AgriTrade
          </Link>
          <button
            className="sidebar-close-btn"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-user-preview consumer-preview">
          <div className="sidebar-avatar consumer-avatar">🛒</div>
          <div className="sidebar-user-details">
            <span className="sidebar-user-name">{user?.name || "Consumer"}</span>
            <span className="sidebar-user-role">🛒 Consumer Account</span>
          </div>
        </div>

        <nav>
          <Link to="/home" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🏠</span> Home
          </Link>

          <Link to="/consumer-dashboard" className="sidebar-nav-item active" onClick={closeSidebar}>
            <span>📊</span> Dashboard
          </Link>

          <Link to="/products" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🛒</span> Browse Products
          </Link>

          <Link to="/rentals" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🚜</span> Machinery Rentals
          </Link>

          <Link to="/about" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>ℹ️</span> About AgriTrade
          </Link>

          <Link to="/profile" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>👤</span> My Profile
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-content">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <h1>Hello, {user?.name || "Consumer"}! 👋</h1>
            <p>
              Discover fresh harvest, organic grains and machinery directly from local farmers.
            </p>
          </div>

          <div className="user-badge consumer-badge">
            <span className="badge-dot-blue"></span>
            🛒 Buyer Account
          </div>
        </header>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="dashboard-search-form">
          <div className="dashboard-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search fresh wheat, basmati rice, vegetables, fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">
              Search Produce
            </button>
          </div>
        </form>

        {/* QUICK CATEGORIES */}
        <section className="dashboard-section">
          <div className="section-title">
            <h2>Explore Categories</h2>
            <Link to="/products" className="view-all-link">
              View All Categories →
            </Link>
          </div>

          <div className="consumer-categories">
            <Link to="/products" className="consumer-category" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="cat-icon">🌾</span>
              <div>
                <strong>Grains & Pulses</strong>
                <small>Wheat, Rice, Dal</small>
              </div>
            </Link>

            <Link to="/products" className="consumer-category" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="cat-icon">🥕</span>
              <div>
                <strong>Vegetables</strong>
                <small>Farm-fresh Produce</small>
              </div>
            </Link>

            <Link to="/products" className="consumer-category" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="cat-icon">🍎</span>
              <div>
                <strong>Seasonal Fruits</strong>
                <small>Naturally Ripened</small>
              </div>
            </Link>

            <Link to="/products" className="consumer-category" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="cat-icon">🌱</span>
              <div>
                <strong>Seeds & Organic</strong>
                <small>High Quality Inputs</small>
              </div>
            </Link>
          </div>
        </section>

        {/* FRESH FROM FARMERS */}
        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Fresh From Local Farmers</h2>
              <p>Direct harvests available for immediate delivery with zero broker cut</p>
            </div>

            <Link to="/products" className="view-all-link">
              Browse All ({products.length}) →
            </Link>
          </div>

          {loading && (
            <div className="dashboard-loading">
              <span>⏳</span> Loading fresh products...
            </div>
          )}

          {!loading && error && (
            <div className="empty-state error-box">
              <div className="empty-icon">⚠️</div>
              <h3>Unable to load products</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🌱</div>
              <h3>No products available right now</h3>
              <p>Farmers will post new listings soon. Check back shortly!</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="product-preview-grid">
              {products.slice(0, 3).map((product) => (
                <div className="product-preview-card" key={product._id}>
                  <div
                    className="product-preview-image"
                    onClick={() => product.image && setPreviewImageModal({ url: product.image, title: product.name })}
                    style={{ cursor: product.image ? "pointer" : "default" }}
                    title={product.image ? "Click to view image" : ""}
                  >
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span className="preview-fallback-icon">🌾</span>
                    )}
                    <span className="preview-category-badge">{product.category || "Crop"}</span>
                  </div>

                  <div className="product-preview-body">
                    <h3 className="preview-title">{product.name}</h3>

                    <p className="preview-description">
                      {product.description || "Fresh harvest directly from verified farmer."}
                    </p>

                    <div className="preview-price-row">
                      <div className="preview-price">
                        ₹{product.price}
                        <span> / {product.unit || "kg"}</span>
                      </div>
                      <span className="preview-stock">
                        {product.quantity > 0 ? `${product.quantity} ${product.unit || "kg"} left` : "Out of stock"}
                      </span>
                    </div>

                    {product.location && (
                      <p className="preview-location">
                        📍 {product.location}
                      </p>
                    )}

                    {product.farmer && (
                      <div className="preview-farmer-row">
                        <span>👨‍🌾 {product.farmer.name || "Farmer"}</span>
                      </div>
                    )}

                    <div className="preview-actions">
                      <Link
                        to={`/products/${product._id}`}
                        className="primary-btn preview-action-btn"
                        style={{ textDecoration: "none", textAlign: "center" }}
                      >
                        View Crop Details →
                      </Link>

                      {product.farmer && (
                        <button
                          type="button"
                          onClick={() => setSelectedFarmer(product.farmer)}
                          className="secondary-btn preview-farmer-btn"
                          title="View farmer profile"
                        >
                          👤 Seller
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RENTALS BANNER */}
        <section className="rental-banner">
          <div className="rental-banner-content">
            <span className="rental-banner-tag">🚜 FARM MACHINERY SHARING</span>
            <h2>Need Tractors, Harvesters or Pumps?</h2>
            <p>
              Discover tractors, combine harvesters, rotavators, and irrigation pumps available for affordable rent near your area.
            </p>
          </div>

          <Link to="/rentals" className="rental-banner-btn">
            Explore Machinery Rentals →
          </Link>
        </section>
      </main>

      {/* FARMER PROFILE MODAL */}
      {selectedFarmer && (
        <FarmerProfileModal
          farmer={selectedFarmer}
          onClose={() => setSelectedFarmer(null)}
        />
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

export default ConsumerDashboard;