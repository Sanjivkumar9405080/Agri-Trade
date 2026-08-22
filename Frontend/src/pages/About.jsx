import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>
            🌱 About <span>AgriTrade</span>
          </h1>

          <p>
            Connecting farmers and consumers through a simple,
            transparent and trusted agricultural marketplace.
          </p>

          <div className="about-buttons">
            <Link to="/register" className="about-primary-btn">
              Get Started
            </Link>

            <Link to="/products" className="about-secondary-btn">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div>
          <h2>Our Mission</h2>
          <p>
            Our mission is to help farmers sell their agricultural
            products directly to consumers while reducing unnecessary
            middlemen. AgriTrade provides a simple digital marketplace
            where farmers can showcase their products and consumers
            can discover fresh products directly from them.
          </p>
        </div>

        <div>
          <h2 className="vision-title">Our Vision</h2>
          <p>
            We envision a connected agricultural ecosystem where
            farmers get better opportunities, consumers get access
            to trusted products, and agricultural equipment can be
            easily shared through rentals.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="about-offer">
        <h2>Everything You Need in One Place</h2>

        <p className="about-section-text">
          AgriTrade brings farmers and consumers together with
          useful marketplace services.
        </p>

        <div className="about-cards">

          <div className="about-card">
            <div className="about-icon">🌾</div>
            <h3>Farm Products</h3>
            <p>
              Farmers can list grains, vegetables, fruits, seeds
              and other agricultural products for sale.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🛒</div>
            <h3>Direct Buying</h3>
            <p>
              Consumers can discover products directly from
              farmers and make informed purchasing decisions.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🚜</div>
            <h3>Equipment Rentals</h3>
            <p>
              Farmers can offer agricultural equipment for rent
              and others can find equipment available nearby.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">⭐</div>
            <h3>Reviews & Trust</h3>
            <p>
              Consumers can review farmers and products, helping
              build transparency and trust within the marketplace.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">👨‍🌾</div>
            <h3>Farmer Profiles</h3>
            <p>
              Farmers can create profiles with their details,
              products, experience and contact information.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>
              User authentication and role-based access help keep
              farmer and consumer accounts protected.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="about-how">
        <h2>How AgriTrade Works</h2>

        <div className="about-steps">

          <div className="about-step">
            <span>01</span>
            <h3>Create Account</h3>
            <p>
              Register as a farmer or consumer and create your profile.
            </p>
          </div>

          <div className="about-step">
            <span>02</span>
            <h3>Explore</h3>
            <p>
              Browse farm products or discover available equipment.
            </p>
          </div>

          <div className="about-step">
            <span>03</span>
            <h3>Connect</h3>
            <p>
              View farmer profiles and connect directly with sellers.
            </p>
          </div>

          <div className="about-step">
            <span>04</span>
            <h3>Buy or Rent</h3>
            <p>
              Purchase farm products or rent agricultural equipment.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">

        <div>
          <strong>100+</strong>
          <span>Farm Products</span>
        </div>

        <div>
          <strong>50+</strong>
          <span>Farmers</span>
        </div>

        <div>
          <strong>25+</strong>
          <span>Equipment Listings</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Farmer Focused</span>
        </div>

      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Grow with AgriTrade?</h2>

        <p>
          Join our agricultural marketplace and connect
          directly with farmers and consumers.
        </p>

        <Link to="/register">
          Create Your Account →
        </Link>
      </section>

    </div>
  );
}

export default About;