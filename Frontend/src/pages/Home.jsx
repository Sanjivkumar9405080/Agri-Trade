import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
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

  const productsLink = user?.role === "farmer" ? "/farmer/products" : "/products";
  const getStartedLink = user ? (user.role === "farmer" ? "/farmer-dashboard" : "/consumer-dashboard") : "/register";

  return (
    <div className="home-page-wrapper">
      <Navbar />

      <main className="home-main">
        {/* ================= HERO SECTION ================= */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-tag-badge">
                <span className="pulse-dot"></span>
                🌱 INDIA'S DIRECT FARM MARKETPLACE
              </div>

              <h1 className="hero-title">
                Fresh Harvest <br />
                <span>Directly From Farmers</span> <br />
                To Your Table.
              </h1>

              <p className="hero-description">
                Eliminate middlemen and buy directly from hard-working farmers at transparent, fair rates. Farmers can sell crops nationwide and rent agricultural machinery with ease.
              </p>

              <div className="hero-buttons">
                <Link to={productsLink} className="primary-btn hero-btn">
                  🛒 Explore Products
                </Link>

                <Link to="/rentals" className="secondary-btn hero-btn">
                  🚜 Rent Equipment
                </Link>
              </div>

              {/* Trust micro-stats */}
              <div className="hero-trust-metrics">
                <div className="trust-metric-item">
                  <strong>100%</strong>
                  <span>Direct Trade</span>
                </div>
                <div className="trust-metric-divider"></div>
                <div className="trust-metric-item">
                  <strong>₹0</strong>
                  <span>Middleman Fee</span>
                </div>
                <div className="trust-metric-divider"></div>
                <div className="trust-metric-item">
                  <strong>Verified</strong>
                  <span>Farmers & Rented Gear</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="hero-visual">
              <div className="hero-feature-card">
                <div className="hero-card-header">
                  <div className="hero-card-badge">🌾 Today's Featured Harvest</div>
                  <span className="hero-badge-live">Live Market</span>
                </div>

                <div className="hero-card-crop">
                  <div className="crop-avatar">🌾</div>
                  <div className="crop-details">
                    <h3>Golden Sharbati Wheat</h3>
                    <p>📍 Harda, Madhya Pradesh • Grade A</p>
                  </div>
                </div>

                <div className="hero-card-stats">
                  <div className="crop-stat">
                    <span>Direct Price</span>
                    <strong>₹2,450 / quintal</strong>
                  </div>
                  <div className="crop-stat">
                    <span>Available Stock</span>
                    <strong>120 Quintals</strong>
                  </div>
                </div>

                <div className="hero-card-floating-badge top-right">
                  <span className="badge-icon">🛡️</span>
                  <span>100% Organic Verified</span>
                </div>

                <div className="hero-card-floating-badge bottom-left">
                  <span className="badge-icon">⚡</span>
                  <span>Direct Farmer Contact</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES SECTION ================= */}
        <section className="categories">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-badge">EXPLORE CATEGORIES</span>
              <h2>Everything Agriculture, All In One Place</h2>
              <p>Discover fresh farm products, organic produce, seeds and rental machinery.</p>
            </div>

            <div className="category-grid">
              <Link to="/products" className="category-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="category-icon-wrapper grain">🌾</div>
                <h3>Grains & Cereals</h3>
                <p>Premium Basmati rice, Sharbati wheat, maize, barley and pulses directly from fields.</p>
                <span className="category-link-text">Browse Grains →</span>
              </Link>

              <Link to="/products" className="category-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="category-icon-wrapper veg">🥕</div>
                <h3>Fresh Vegetables</h3>
                <p>Farm-fresh potatoes, tomatoes, onions, leafy greens, and seasonal organic crops.</p>
                <span className="category-link-text">Browse Veggies →</span>
              </Link>

              <Link to="/products" className="category-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="category-icon-wrapper fruit">🍎</div>
                <h3>Seasonal Fruits</h3>
                <p>Naturally ripened mangoes, apples, bananas, citrus and berries straight from orchards.</p>
                <span className="category-link-text">Browse Fruits →</span>
              </Link>

              <Link to="/products" className="category-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="category-icon-wrapper seed">🌱</div>
                <h3>Certified Seeds</h3>
                <p>High-yield certified seeds, organic fertilizers, and quality bio-farming inputs.</p>
                <span className="category-link-text">Browse Seeds →</span>
              </Link>

              <Link to="/rentals" className="category-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="category-icon-wrapper tractor">🚜</div>
                <h3>Machinery Rentals</h3>
                <p>Rent high-horsepower tractors, combine harvesters, rotavators and water pumps.</p>
                <span className="category-link-text">Explore Rentals →</span>
              </Link>

              <div className="category-card highlight-card">
                <div className="category-icon-wrapper direct">🤝</div>
                <h3>Direct Farmer Trade</h3>
                <p>Connect with local farmers directly, inspect produce quality, and agree on fair rates.</p>
                <Link to={getStartedLink} className="category-link-text" style={{ fontWeight: "700" }}>
                  Join AgriTrade Today →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="how-section">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-badge">TRANSPARENT PROCESS</span>
              <h2>How AgriTrade Works</h2>
              <p>A simple, direct platform connecting producers and buyers without interference.</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-num-badge">01</div>
                <div className="step-icon">📝</div>
                <h3>Create Account</h3>
                <p>Sign up in under 60 seconds as a <strong>Farmer</strong> to sell or rent, or as a <strong>Consumer</strong> to buy fresh produce.</p>
              </div>

              <div className="step">
                <div className="step-num-badge">02</div>
                <div className="step-icon">🔍</div>
                <h3>Explore & Connect</h3>
                <p>Search crops by name, category, or location. View farmer profiles, pricing, stock levels and machinery availability.</p>
              </div>

              <div className="step">
                <div className="step-num-badge">03</div>
                <div className="step-icon">🤝</div>
                <h3>Trade Directly</h3>
                <p>Contact the farmer directly by phone or message. Inspect produce, agree on delivery, and pay directly with zero cut.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUE PROPOSITION / TRUST ================= */}
        <section className="why-section">
          <div className="section-container">
            <div className="why-grid">
              <div className="why-item">
                <span className="why-icon">💰</span>
                <h4>Better Income for Farmers</h4>
                <p>Cut out up to 30-40% commission taken by middlemen, giving farmers full value for their hard work.</p>
              </div>

              <div className="why-item">
                <span className="why-icon">🌿</span>
                <h4>Fresher Produce for Buyers</h4>
                <p>Harvested and delivered directly without sitting in intermediate godowns for weeks.</p>
              </div>

              <div className="why-item">
                <span className="why-icon">🚜</span>
                <h4>Affordable Machinery Sharing</h4>
                <p>Smallholder farmers can rent tractors and harvesters affordably from neighboring machinery owners.</p>
              </div>

              <div className="why-item">
                <span className="why-icon">📱</span>
                <h4>Fast & Simple to Use</h4>
                <p>Built for mobile, tablet, and PC. Simple navigation with fast loading on 3G, 4G, or 5G connections.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="cta">
          <div className="cta-container">
            <span className="cta-subtitle">START TODAY</span>
            <h2>Ready to transform how you buy & sell crops?</h2>
            <p>
              Join thousands of farmers and conscious consumers who trade agricultural goods directly every single day.
            </p>
            <div className="cta-buttons">
              <Link to={getStartedLink} className="primary-btn cta-btn">
                Get Started Free →
              </Link>
              <Link to="/about" className="secondary-btn cta-btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;