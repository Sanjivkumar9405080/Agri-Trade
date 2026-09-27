import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

function About() {
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

  const getStartedLink = user ? (user.role === "farmer" ? "/farmer-dashboard" : "/consumer-dashboard") : "/register";

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">🌱 OUR STORY & PURPOSE</span>
          <h1>
            Empowering Agriculture Through <span>Direct Connection</span>
          </h1>

          <p>
            AgriTrade bridges the gap between rural farmers and urban consumers through a transparent, high-trust digital marketplace built to ensure fair prices for farmers and fresher food for consumers.
          </p>

          <div className="about-buttons">
            <Link to={getStartedLink} className="about-primary-btn">
              Get Started Now
            </Link>

            <Link to="/products" className="about-secondary-btn">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                Our mission is to help farmers maximize their agricultural profits by enabling them to sell grains, vegetables, and fruits directly to consumers while eliminating unneeded intermediaries. AgriTrade delivers a simple, accessible digital marketplace where growers can showcase their produce with full pricing autonomy.
              </p>
            </div>

            <div className="mission-card vision-card">
              <div className="mission-icon">🌾</div>
              <h2 className="vision-title">Our Vision</h2>
              <p>
                We envision a connected, self-reliant agricultural ecosystem across India where every farmer gets fair compensation for their harvest, consumers enjoy farm-to-table freshness, and high-efficiency machinery is readily accessible through community rentals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="about-offer">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-badge">PLATFORM FEATURES</span>
            <h2>Everything Farmers & Consumers Need</h2>
            <p className="about-section-text">
              AgriTrade is designed from the ground up to solve real day-to-day challenges faced by farmers and agricultural buyers.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <div className="about-icon">🌾</div>
              <h3>Direct Farm Products</h3>
              <p>
                Farmers list grains, pulses, fresh vegetables, fruits, and seeds with transparent prices and available stock.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">🛒</div>
              <h3>Zero-Commission Buying</h3>
              <p>
                Consumers and retailers browse listings directly from local farmers and make informed, honest purchases.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">🚜</div>
              <h3>Machinery Rentals</h3>
              <p>
                Equipment owners list tractors, harvesters, rotavators, and water pumps for rent, making mechanization affordable for all.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">⭐</div>
              <h3>Reputation & Trust</h3>
              <p>
                Customer feedback and farmer profiles build long-term trust, accountability, and dependable business relationships.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">👨‍🌾</div>
              <h3>Verified Profiles</h3>
              <p>
                Detailed farmer profiles showcase farming practices, village location, produce specialties, and direct phone contact.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>
                Role-based authentication and clean authorization safeguard both farmer listings and consumer inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-how">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-badge">EASY 4-STEP PROCESS</span>
            <h2>How AgriTrade Works</h2>
          </div>

          <div className="about-steps">
            <div className="about-step">
              <span className="step-num">01</span>
              <h3>Create Profile</h3>
              <p>
                Sign up as a farmer or consumer and complete your profile in under two minutes.
              </p>
            </div>

            <div className="about-step">
              <span className="step-num">02</span>
              <h3>List or Search</h3>
              <p>
                Farmers publish their crops with photos and prices; buyers search by crop or location.
              </p>
            </div>

            <div className="about-step">
              <span className="step-num">03</span>
              <h3>Direct Connect</h3>
              <p>
                Connect directly via telephone or chat to verify quality, quantity, and delivery terms.
              </p>
            </div>

            <div className="about-step">
              <span className="step-num">04</span>
              <h3>Fulfill & Review</h3>
              <p>
                Complete direct transaction with zero deductions and leave feedback for community trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats">
            <div className="stat-box">
              <strong>100%</strong>
              <span>Direct Trade</span>
            </div>

            <div className="stat-box">
              <strong>0%</strong>
              <span>Commission Cut</span>
            </div>

            <div className="stat-box">
              <strong>All-India</strong>
              <span>Crops & Machinery</span>
            </div>

            <div className="stat-box">
              <strong>24/7</strong>
              <span>Mobile-Ready Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to Grow with AgriTrade?</h2>
          <p>
            Join thousands of forward-thinking farmers and consumers redefining the future of agricultural commerce.
          </p>
          <Link to="/register" className="about-primary-btn">
            Create Free Account →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;