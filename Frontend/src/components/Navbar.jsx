import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  let user = null;
  if (token && userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileMenuOpen(false);
    navigate("/home");
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link
        to="/home"
        className="logo"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={closeMenu}
      >
        🌾 AgriTrade
      </Link>

      <button
        className="hamburger-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        <Link to="/home" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        {user ? (
          <>
            {user.role === "farmer" ? (
              <>
                <Link to="/farmer-dashboard" onClick={closeMenu}>🏠 Dashboard</Link>
                <Link to="/farmer/products" onClick={closeMenu}>🌾 My Products</Link>
              </>
            ) : (
              <>
                <Link to="/consumer-dashboard" onClick={closeMenu}>🏠 Dashboard</Link>
                <Link to="/products" onClick={closeMenu}>🛒 Browse Products</Link>
              </>
            )}

            <Link to="/rentals" onClick={closeMenu}>🚜 Rentals</Link>
            <Link to="/profile" className="profile-link" onClick={closeMenu}>
              👤 Profile
            </Link>
            <button
              onClick={handleLogout}
              className="nav-logout-btn"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#b91c1c",
                fontWeight: "600"
              }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="register-btn" onClick={closeMenu}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;