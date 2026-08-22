import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />

      <main>

        {/* Hero Section */}
        <section className="hero">

          <div className="hero-content">
            <p className="hero-tag">
              🌱 FARM DIRECT MARKETPLACE
            </p>

            <h1>
              From Farm
              <br />
              <span>Directly to You.</span>
            </h1>

            <p className="hero-description">
              Buy fresh agricultural products directly from farmers
              without middlemen. Farmers can sell their products and
              rent agricultural equipment easily.
            </p>

            <div className="hero-buttons">
              <Link to={productsLink} className="primary-btn" style={{ textDecoration: "none" }}>
                Explore Products
              </Link>

              <Link to="/rentals" className="secondary-btn" style={{ textDecoration: "none" }}>
                🚜 Rent Equipment
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <div className="farmer-card">
              🌾
            </div>
          </div>

        </section>


        {/* Categories */}
        <section className="categories">

          <div className="section-heading">
            <p>WHAT WE OFFER</p>
            <h2>Everything Farmers & Consumers Need</h2>
          </div>

          <div className="category-grid">

            <div className="category-card">
              <div className="category-icon">🌾</div>
              <h3>Farm Products</h3>
              <p>
                Buy fresh rice, wheat, vegetables and other
                agricultural products directly from farmers.
              </p>
            </div>

            <div className="category-card">
              <div className="category-icon">🚜</div>
              <h3>Equipment Rental</h3>
              <p>
                Rent tractors, harvesters and other farming
                equipment from nearby providers.
              </p>
            </div>

            <div className="category-card">
              <div className="category-icon">🤝</div>
              <h3>Direct Connection</h3>
              <p>
                Connect farmers directly with consumers and
                reduce unnecessary middlemen.
              </p>
            </div>

          </div>

        </section>


        {/* How it works */}
        <section className="how-section">

          <div className="section-heading">
            <p>HOW IT WORKS</p>
            <h2>Simple. Direct. Transparent.</h2>
          </div>

          <div className="steps">

            <div className="step">
              <span>01</span>
              <h3>Create Account</h3>
              <p>
                Choose whether you are a farmer or consumer.
              </p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>Explore</h3>
              <p>
                Find agricultural products or equipment near you.
              </p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Connect & Trade</h3>
              <p>
                Buy directly from farmers or rent equipment.
              </p>
            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="cta">

          <h2>Ready to connect with farmers?</h2>

          <p>
            Join AgriTrade and make agriculture more direct,
            transparent and accessible.
          </p>

          <Link to={getStartedLink} className="primary-btn" style={{ textDecoration: "none" }}>
            Get Started
          </Link>

        </section>

      </main>
    </>
  );
}

export default Home;