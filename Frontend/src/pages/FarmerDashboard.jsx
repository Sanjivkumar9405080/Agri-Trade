import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFarmerProducts } from "../services/FarmerProductService";

function FarmerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.quantity > 0 && p.status !== "Out of Stock").length;
  const outOfStockProducts = products.filter((p) => p.quantity === 0 || p.status === "Out of Stock").length;

  return (
    <div className="dashboard-page">

      <aside className="sidebar">

        <div className="dashboard-logo">
          🌾 AgriTrade
        </div>

        <nav>
          <Link to="/home" style={{ color: "#166534", fontWeight: "600" }}>
            ← Back to Home
          </Link>

          <Link to="/farmer-dashboard" className="active">
            🏠 Dashboard
          </Link>

          <Link to="/farmer/products">
            🌾 My Products
          </Link>

          <Link to="/rentals">
            🚜 Rentals
          </Link>

          <Link to="/about">
            ℹ️ About Us
          </Link>

          <Link to="/profile">
            👤 Profile
          </Link>
        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>


      <main className="dashboard-content">

        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name || "Farmer"}! 👋</h1>
            <p>
              Manage your agricultural products, rentals and orders.
            </p>
          </div>

          <div className="user-badge">
            🌾 Farmer Account
          </div>
        </header>


        {/* Statistics */}

        <section className="stats-grid">

          <div className="stat-card">
            <span>🌾</span>
            <div>
              <p>Total Products</p>
              <h2>{loading ? "..." : totalProducts}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>✅</span>
            <div>
              <p>Available</p>
              <h2>{loading ? "..." : availableProducts}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⚠️</span>
            <div>
              <p>Out of Stock</p>
              <h2>{loading ? "..." : outOfStockProducts}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>🚜</span>
            <div>
              <p>Rental Items</p>
              <h2>0</h2>
            </div>
          </div>

        </section>


        {/* Quick Actions */}

        <section className="dashboard-section">

          <div className="section-title">
            <h2>Quick Actions</h2>
          </div>

          <div className="action-grid">

            <button
              className="action-card"
              onClick={() => navigate("/farmer/products/create")}
            >
              <span>➕</span>
              <h3>Add Product</h3>
              <p>Sell wheat, rice, vegetables and more directly.</p>
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/farmer/products")}
            >
              <span>🌾</span>
              <h3>Manage Products</h3>
              <p>View, edit or delete your existing listings.</p>
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/rentals")}
            >
              <span>🚜</span>
              <h3>Rentals</h3>
              <p>List your farming equipment for rent.</p>
            </button>

          </div>

        </section>


        {/* Recent Products */}

        <section className="dashboard-section">

          <div className="section-title">
            <h2>My Recent Products</h2>

            <Link to="/farmer/products">
              View All →
            </Link>
          </div>

          {loading ? (
            <p>Loading recent products...</p>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div>🌱</div>
              <h3>No products listed yet</h3>
              <p>
                Add your first agricultural product to start selling directly.
              </p>
              <button
                className="primary-btn"
                onClick={() => navigate("/farmer/products/create")}
              >
                + Add Product
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {products.slice(0, 3).map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-image">
                    {product.image ? <img src={product.image} alt={product.name} /> : <span>🌾</span>}
                  </div>
                  <div className="product-card-content">
                    <span className="product-category">{product.category}</span>
                    <h2>{product.name}</h2>
                    <div className="product-price">
                      ₹{product.price} <span>/ {product.unit}</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#64748b" }}>
                      Stock: {product.quantity} {product.unit}
                    </p>
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