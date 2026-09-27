import React from "react";
import { Link } from "react-router-dom";

function Footer() {
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

  const dashboardLink = user?.role === "farmer" ? "/farmer-dashboard" : "/consumer-dashboard";

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <Link to="/home" className="footer-logo">
              <span className="footer-logo-icon">🌾</span> AgriTrade
            </Link>
            <p className="footer-tagline">
              Empowering Indian agriculture by connecting farmers directly with consumers and businesses. Zero middlemen, fair prices, and trusted equipment sharing.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🌱 100% Direct Trade</span>
              <span className="footer-badge">🚜 Verified Rentals</span>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div className="footer-col">
            <h4 className="footer-title">Marketplace</h4>
            <ul className="footer-links">
              <li><Link to="/products">Fresh Grains & Cereals</Link></li>
              <li><Link to="/products">Organic Vegetables</Link></li>
              <li><Link to="/products">Seasonal Fruits</Link></li>
              <li><Link to="/products">Certified Seeds</Link></li>
              <li><Link to="/rentals">Tractors & Machinery</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About AgriTrade</Link></li>
              {user ? (
                <>
                  <li><Link to={dashboardLink}>My Dashboard</Link></li>
                  <li><Link to="/profile">My Profile</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register as Farmer / Buyer</Link></li>
                </>
              )}
              <li><Link to="/rentals">Equipment Rentals</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="footer-col">
            <h4 className="footer-title">Support & Trust</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>Serving rural and urban markets across India</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>Kisan Helpline: 1800-AGRI-TRADE</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span>support@agritrade.org</span>
              </li>
            </ul>
            <div className="footer-safe-badge">
              <span>🛡️ Safe & Transparent Direct Marketplace</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AgriTrade. All rights reserved. Built for farmers and consumers.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about">Terms of Service</Link>
            <span>•</span>
            <Link to="/about">Farmer Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
