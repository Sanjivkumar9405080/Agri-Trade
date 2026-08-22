import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/ProductService";

import FarmerProfileModal from "../components/FarmerProfileModal";
import ImageModal from "../components/ImageModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & filters
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Modals
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [previewImageModal, setPreviewImageModal] = useState(null);

  // =========================
  // GET PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        console.log("Products:", data);

        setProducts(data.products || []);
      } catch (err) {
        console.error("Product Error:", err);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = products.filter((product) => {
    const productName =
      product.name?.toLowerCase() || "";

    const productDescription =
      product.description?.toLowerCase() || "";

    const productCategory =
      product.category?.toLowerCase() || "";

    const productLocation =
      product.location?.toLowerCase() || "";

    const searchText =
      search.toLowerCase().trim();

    const locationText =
      locationSearch.toLowerCase().trim();

    // Product search
    const matchesSearch =
      productName.includes(searchText) ||
      productDescription.includes(searchText);

    // Location search
    const matchesLocation =
      productLocation.includes(locationText);

    // Category filter
    const matchesCategory =
      category === "all" ||
      productCategory === category;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory
    );
  });

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setCategory("all");
  };

  return (
    <div className="products-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="products-header">

        <div>
          <span className="products-label">
            🌾 AGRITRADE MARKETPLACE
          </span>

          <h1>
            Farm Products
          </h1>

          <p>
            Buy fresh products directly from farmers.
          </p>
        </div>

        <Link
          to="/consumer-dashboard"
          className="back-btn"
        >
          ← Dashboard
        </Link>

      </div>

      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <div className="products-toolbar">

        {/* Product Search */}

        <div className="product-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search rice, wheat, vegetables..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Location Search */}

        <div className="product-search">
          <span>📍</span>

          <input
            type="text"
            placeholder="Search city, village or district..."
            value={locationSearch}
            onChange={(e) =>
              setLocationSearch(e.target.value)
            }
          />
        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="category-select"
        >
          <option value="all">
            All Categories
          </option>

          <option value="grains">
            🌾 Grains
          </option>

          <option value="vegetables">
            🥕 Vegetables
          </option>

          <option value="fruits">
            🍎 Fruits
          </option>

          <option value="seeds">
            🌱 Seeds
          </option>

          <option value="other">
            Other
          </option>
        </select>

      </div>

      {/* =========================
          RESULTS HEADER
      ========================= */}

      {!loading && !error && (
        <div className="products-result-header">

          <div>
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            products found
          </div>

          {(search ||
            locationSearch ||
            category !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="clear-filter-btn"
            >
              Clear Filters
            </button>
          )}

        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="products-message">

          <div>⏳</div>

          <h3>
            Loading products...
          </h3>

          <p>
            Finding fresh products from farmers.
          </p>

        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {!loading && error && (
        <div className="products-message">

          <div>⚠️</div>

          <h3>
            {error}
          </h3>

          <p>
            Please check your backend server.
          </p>

        </div>
      )}

      {/* =========================
          NO PRODUCTS
      ========================= */}

      {!loading &&
        !error &&
        filteredProducts.length === 0 && (

          <div className="products-message">

            <div>🌱</div>

            <h3>
              No products found
            </h3>

            <p>
              Try another product, location or category.
            </p>

            {(search ||
              locationSearch ||
              category !== "all") && (

              <button
                type="button"
                onClick={clearFilters}
                className="clear-filter-btn"
              >
                Clear Filters
              </button>

            )}

          </div>
        )}

      {/* =========================
          PRODUCT GRID
      ========================= */}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (

          <div className="products-grid">

            {filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product._id}
              >

                {/* =========================
                    PRODUCT IMAGE
                ========================= */}

                <div
                  className="product-image"
                  onClick={() => {
                    if (product.image) {
                      setPreviewImageModal({
                        url: product.image,
                        title: product.name
                      });
                    }
                  }}
                  style={{
                    cursor: product.image
                      ? "pointer"
                      : "default"
                  }}
                  title={
                    product.image
                      ? "Click to enlarge image"
                      : ""
                  }
                >

                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  ) : (

                    <span>
                      🌾
                    </span>

                  )}

                </div>

                {/* =========================
                    PRODUCT CONTENT
                ========================= */}

                <div className="product-card-content">

                  {/* Category */}

                  <span className="product-category">
                    {product.category ||
                      "Agricultural Product"}
                  </span>

                  {/* Product Name */}

                  <h2>
                    {product.name}
                  </h2>

                  {/* Description */}

                  <p className="product-description">
                    {product.description ||
                      "Fresh product directly from farmer."}
                  </p>

                  {/* Price */}

                  <div className="product-price">
                    ₹{product.price}

                    <span>
                      / {product.unit || "kg"}
                    </span>
                  </div>

                  {/* Quantity */}

                  <div className="product-info">

                    <span>
                      📦 Available:{" "}
                      {product.quantity}{" "}
                      {product.unit || "kg"}
                    </span>

                  </div>

                  {/* Location */}

                  {product.location && (

                    <div className="product-location">
                      📍 {product.location}
                    </div>

                  )}

                  {/* =========================
                      FARMER INFORMATION
                  ========================= */}

                  {product.farmer && (

                    <div
                      className="farmer-info"
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                        border:
                          "1px solid #e2e8f0"
                      }}
                    >

                      <span
                        style={{
                          fontSize: "14px",
                          color: "#334155",
                          display: "block",
                          marginBottom: "4px"
                        }}
                      >
                        👨‍🌾 Seller:{" "}
                        <strong>
                          {product.farmer.name ||
                            "Farmer"}
                        </strong>
                      </span>

                      {product.farmer.phone && (

                        <span
                          style={{
                            fontSize: "13px",
                            color: "#64748b",
                            display: "block"
                          }}
                        >
                          📞{" "}
                          {product.farmer.phone}
                        </span>

                      )}

                    </div>

                  )}

                  {/* =========================
                      ACTION BUTTONS
                  ========================= */}

                  <div
                    className="product-actions"
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px"
                    }}
                  >

                    {/* Product Details */}

                    <Link
                      to={`/products/${product._id}`}
                      className="view-product-btn"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        textDecoration: "none"
                      }}
                    >
                      View Product →
                    </Link>

                    {/* Farmer Profile */}

                    {product.farmer && (

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFarmer(
                            product.farmer
                          )
                        }
                        className="farmer-profile-btn"
                        style={{
                          flex: 1,
                          cursor: "pointer"
                        }}
                      >
                        👤 Farmer
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      {/* =========================
          FARMER PROFILE MODAL
      ========================= */}

      {selectedFarmer && (

        <FarmerProfileModal
          farmer={selectedFarmer}
          onClose={() =>
            setSelectedFarmer(null)
          }
        />

      )}

      {/* =========================
          IMAGE MODAL
      ========================= */}

      <ImageModal
        imageUrl={
          previewImageModal?.url
        }
        title={
          previewImageModal?.title
        }
        onClose={() =>
          setPreviewImageModal(null)
        }
      />

    </div>
  );
}

export default Products;