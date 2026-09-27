import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFarmerProducts } from "../services/FarmerProductService";

function FarmerDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getFarmerProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.quantity > 0 && p.status !== "Out of Stock").length;
  const outOfStockProducts = products.filter((p) => p.quantity === 0 || p.status === "Out of Stock").length;

  return (
    <div className="dashboard-page">
      {/* Mobile Topbar with hamburger for mobile navigation */}
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

      {/* Sidebar Overlay on mobile */}
      {mobileSidebarOpen && (
        <div
          className="dashboard-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
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

        <div className="sidebar-user-preview">
          <div className="sidebar-avatar">👨‍🌾</div>
          <div className="sidebar-user-details">
            <span className="sidebar-user-name">{user?.name || "Farmer"}</span>
            <span className="sidebar-user-role">🌾 Farmer Account</span>
          </div>
        </div>

        <nav>
          <Link to="/home" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🏠</span> Home
          </Link>

          <Link to="/farmer-dashboard" className="sidebar-nav-item active" onClick={closeSidebar}>
            <span>📊</span> Dashboard
          </Link>

          <Link to="/farmer/products" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🌾</span> My Products
          </Link>

          <Link to="/farmer/products/create" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>➕</span> Add New Product
          </Link>

          <Link to="/rentals" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🚜</span> Machinery Rentals
          </Link>

          <Link to="/products" className="sidebar-nav-item" onClick={closeSidebar}>
            <span>🛒</span> Marketplace
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

      {/* MAIN DASHBOARD CONTENT */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name || "Farmer"}! 👋</h1>
            <p>
              Manage your agricultural crops, machinery rentals, and direct consumer inquiries.
            </p>
          </div>

          <div className="user-badge farmer-badge">
            <span className="badge-dot"></span>
            👨‍🌾 Farmer Dashboard
          </div>
        </header>

        {/* Statistics Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper grain">🌾</div>
            <div className="stat-info">
              <p>Total Products</p>
              <h2>{loading ? "..." : totalProducts}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper active-stat">✅</div>
            <div className="stat-info">
              <p>Active In Stock</p>
              <h2>{loading ? "..." : availableProducts}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper warning-stat">⚠️</div>
            <div className="stat-info">
              <p>Out of Stock</p>
              <h2>{loading ? "..." : outOfStockProducts}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper rental-stat">🚜</div>
            <div className="stat-info">
              <p>Rentals Available</p>
              <h2>6</h2>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="section-title">
            <h2>Quick Actions</h2>
            <p>Direct shortcuts to manage your harvest listings</p>
          </div>

          <div className="action-grid">
            <button
              className="action-card"
              onClick={() => navigate("/farmer/products/create")}
            >
              <span className="action-icon">➕</span>
              <h3>Add Product</h3>
              <p>Sell wheat, rice, vegetables, spices and fruits directly to buyers.</p>
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/farmer/products")}
            >
              <span className="action-icon">🌾</span>
              <h3>Manage Products</h3>
              <p>Edit prices, update available quantities, or delete listings.</p>
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/rentals")}
            >
              <span className="action-icon">🚜</span>
              <h3>Rentals Marketplace</h3>
              <p>Browse or list tractors, harvesters, and water pumps for rent.</p>
            </button>
          </div>
        </section>

        {/* Recent Products */}
        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Recent Produce Listings</h2>
              <p>Your latest crops displayed in the marketplace</p>
            </div>

            <Link to="/farmer/products" className="view-all-link">
              View All Products ({totalProducts}) →
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-loading">
              <span>⏳</span> Loading your listings...
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌱</div>
              <h3>No products listed yet</h3>
              <p>
                Add your first agricultural harvest to start receiving direct orders from consumers without middlemen.
              </p>
              <button
                className="primary-btn"
                onClick={() => navigate("/farmer/products/create")}
                style={{ marginTop: "16px" }}
              >
                + Add Your First Product
              </button>
            </div>
          ) : (
            <div className="dashboard-products-grid">
              {products.slice(0, 3).map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span className="product-fallback-icon">🌾</span>
                    )}
                    <span className="product-category-pill">{product.category || "Produce"}</span>
                  </div>

                  <div className="product-card-content">
                    <h2 className="product-name">{product.name}</h2>

                    <div className="product-price-row">
                      <div className="product-price">
                        ₹{product.price}
                        <span className="product-price-unit"> / {product.unit}</span>
                      </div>
                      <span className="stock-pill">
                        {product.quantity > 0 ? `${product.quantity} ${product.unit} left` : "Out of Stock"}
                      </span>
                    </div>

                    <div className="dashboard-card-actions">
                      <Link
                        to={`/farmer/products/${product._id}/edit`}
                        className="edit-product-btn"
                      >
                        ✏️ Edit Listing
                      </Link>
                      <Link
                        to={`/products/${product._id}`}
                        className="preview-product-btn"
                      >
                        👁️ Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default FarmerDashboard;