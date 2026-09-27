import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu on location change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileMenuOpen(false);
    navigate("/home");
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          <Link
            to="/home"
            className="logo"
            onClick={closeMenu}
          >
            <span className="logo-icon">🌾</span>
            <span className="logo-text">Agri<span className="logo-accent">Trade</span></span>
          </Link>

          <button
            className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            <div className="nav-links-inner">
              <Link to="/home" className={isActive("/home")} onClick={closeMenu}>
                Home
              </Link>
              <Link to="/about" className={isActive("/about")} onClick={closeMenu}>
                About
              </Link>

              {user ? (
                <>
                  {user.role === "farmer" ? (
                    <>
                      <Link to="/farmer-dashboard" className={isActive("/farmer-dashboard")} onClick={closeMenu}>
                        🏠 Dashboard
                      </Link>
                      <Link to="/farmer/products" className={isActive("/farmer/products")} onClick={closeMenu}>
                        🌾 My Products
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/consumer-dashboard" className={isActive("/consumer-dashboard")} onClick={closeMenu}>
                        🏠 Dashboard
                      </Link>
                      <Link to="/products" className={isActive("/products")} onClick={closeMenu}>
                        🛒 Browse Products
                      </Link>
                    </>
                  )}

                  <Link to="/rentals" className={isActive("/rentals")} onClick={closeMenu}>
                    🚜 Rentals
                  </Link>

                  <div className="nav-user-actions">
                    <Link to="/profile" className="profile-link-btn" onClick={closeMenu}>
                      <span className="profile-avatar-tiny">
                        {user.role === "farmer" ? "👨‍🌾" : "👤"}
                      </span>
                      <span className="profile-name-text">
                        {user.name ? user.name.split(" ")[0] : "Profile"}
                      </span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="nav-logout-btn"
                      title="Logout from AgriTrade"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="nav-auth-actions">
                  <Link to="/login" className="nav-login-btn" onClick={closeMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="register-btn" onClick={closeMenu}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Navbar;