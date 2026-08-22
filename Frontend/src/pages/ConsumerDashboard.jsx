import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import FarmerProfileModal from "../components/FarmerProfileModal";
import ImageModal from "../components/ImageModal";

function ConsumerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [previewImageModal, setPreviewImageModal] = useState(null);

  // Fetch products
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        console.log("Products API:", data);

        setProducts(data.products || []);

      } catch (err) {

        console.error("Products Error:", err);

        setError("Unable to load products");

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/home");

  };


  return (

    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="dashboard-logo">
          🌾 AgriTrade
        </div>


        <nav>

          <Link to="/home" style={{ color: "#166534", fontWeight: "600" }}>
            ← Back to Home
          </Link>

          <Link
            to="/consumer-dashboard"
            className="active"
          >
            🏠 Dashboard
          </Link>


          <Link to="/products">
            🛒 Browse Products
          </Link>

          <Link to="/rentals">
            🚜 Rent Equipment
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


      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-content">


        {/* HEADER */}

        <header className="dashboard-header">

          <div>

            <h1>
              Hello, {user?.name || "Consumer"} 👋
            </h1>

            <p>
              Find fresh products directly from farmers.
            </p>

          </div>


          <div className="user-badge">
            🛒 Consumer
          </div>

        </header>


        {/* ================= SEARCH ================= */}

        <div className="dashboard-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search rice, wheat, vegetables..."
          />

        </div>


        {/* ================= CATEGORIES ================= */}

        <section className="dashboard-section">

          <div className="section-title">

            <h2>
              Explore Categories
            </h2>

          </div>


          <div className="consumer-categories">

            <div className="consumer-category">
              🌾
              <span>Grains</span>
            </div>


            <div className="consumer-category">
              🥔
              <span>Vegetables</span>
            </div>


            <div className="consumer-category">
              🍎
              <span>Fruits</span>
            </div>


            <div className="consumer-category">
              🌱
              <span>Seeds</span>
            </div>

          </div>

        </section>


        {/* ================= PRODUCTS ================= */}

        <section className="dashboard-section">


          <div className="section-title">

            <div>

              <h2>
                Fresh From Farmers
              </h2>

              <p>
                Buy directly without middlemen.
              </p>

            </div>


            <Link to="/products">
              View All →
            </Link>

          </div>


          {/* Loading */}

          {loading && (

            <div className="empty-state">

              <div>⏳</div>

              <h3>
                Loading products...
              </h3>

            </div>

          )}


          {/* Error */}

          {!loading && error && (

            <div className="empty-state">

              <div>⚠️</div>

              <h3>
                Something went wrong
              </h3>

              <p>
                {error}
              </p>

            </div>

          )}


          {/* No Products */}

          {!loading &&
            !error &&
            products.length === 0 && (

              <div className="empty-state">

                <div>🌱</div>

                <h3>
                  No products available
                </h3>

                <p>
                  Farmers haven't added any products yet.
                </p>

              </div>

          )}


          {/* Products */}

          {!loading &&
            !error &&
            products.length > 0 && (

              <div className="product-preview-grid">

                {products.slice(0, 3).map((product) => (

                  <div
                    className="product-preview"
                    key={product._id}
                  >


                    {/* Product Icon / Image */}

                    <div
                      className="product-icon"
                      onClick={() => product.image && setPreviewImageModal({ url: product.image, title: product.name })}
                      style={{ cursor: product.image ? "pointer" : "default" }}
                      title={product.image ? "Click to enlarge image" : ""}
                    >
                      {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                      ) : (
                        "🌾"
                      )}
                    </div>


                    {/* Product Name */}

                    <h3>
                      {product.name}
                    </h3>


                    {/* Description */}

                    <p>
                      {product.description ||
                        "Fresh agricultural product"}
                    </p>


                    {/* Price */}

                    <strong>
                      ₹{product.price} /{" "}
                      {product.unit || "kg"}
                    </strong>


                    {/* Quantity */}

                    {product.quantity !== undefined && (

                      <p>
                        Available:{" "}
                        {product.quantity}{" "}
                        {product.unit || "kg"}
                      </p>

                    )}


                    {/* Location */}

                    {product.location && (

                      <p>
                        📍 {product.location}
                      </p>

                    )}


                    {/* Farmer Details */}

                    {product.farmer && (

                      <p style={{ marginTop: "6px", fontSize: "13px", color: "#475569" }}>
                        👨‍🌾 Seller: <strong>{product.farmer.name || "Farmer"}</strong>
                      </p>

                    )}


                    {/* View Product / Seller Profile */}

                    {product.farmer ? (

                      <button
                        type="button"
                        onClick={() => setSelectedFarmer(product.farmer)}
                        className="primary-btn product-btn"
                        style={{ marginTop: "10px", width: "100%", cursor: "pointer", border: "none" }}
                      >
                        👤 View Profile & Contact
                      </button>

                    ) : (

                      <Link
                        to="/products"
                        className="primary-btn product-btn"
                      >
                        Browse Products
                      </Link>

                    )}

                  </div>

                ))}

              </div>

          )}

        </section>


        {/* ================= RENTAL ================= */}

        <section className="rental-banner">

          <div>

            <span>
              🚜 FARMING EQUIPMENT
            </span>


            <h2>
              Need farming equipment?
            </h2>


            <p>
              Find tractors and agricultural equipment
              available for rent near you.
            </p>

          </div>


          <Link to="/rentals">
            Explore Rentals →
          </Link>

        </section>


      </main>

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