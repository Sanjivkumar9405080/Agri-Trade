import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Rentals() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const equipmentList = [
    {
      id: 1,
      name: "Mahindra 575 DI Tractor (45 HP)",
      category: "tractors",
      categoryName: "Tractor",
      icon: "🚜",
      description: "High fuel efficiency, ideal for plowing, haulage, and all types of field cultivation.",
      price: 1200,
      unit: "day",
      location: "Ghaziabad, Uttar Pradesh",
      owner: "Ramesh Choudhary",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      name: "John Deere 5050D Tractor (50 HP)",
      category: "tractors",
      categoryName: "Tractor",
      icon: "🚜",
      description: "Heavy duty with power steering and dual clutch. Perfect for rotavator and laser leveler.",
      price: 1400,
      unit: "day",
      location: "Meerut, Uttar Pradesh",
      owner: "Sukhwinder Singh",
      phone: "+91 98765 43211"
    },
    {
      id: 3,
      name: "Multi-Crop Combine Harvester",
      category: "harvesters",
      categoryName: "Harvester",
      icon: "🌾",
      description: "Fast wheat and paddy harvesting with straw chopper and grain cleaner.",
      price: 2500,
      unit: "hour",
      location: "Karnal, Haryana",
      owner: "Gurmeet Farms",
      phone: "+91 98765 43212"
    },
    {
      id: 4,
      name: "Kirloskar 5 HP Diesel Water Pump",
      category: "pumps",
      categoryName: "Water Pump",
      icon: "💧",
      description: "Portable irrigation water pump with 300ft delivery pipe included for flood or furrow irrigation.",
      price: 500,
      unit: "day",
      location: "Aligarh, Uttar Pradesh",
      owner: "Mohan Lal",
      phone: "+91 98765 43213"
    },
    {
      id: 5,
      name: "Automatic Seed Drill & Fertilizer Seeder",
      category: "seeders",
      categoryName: "Seeder",
      icon: "🌱",
      description: "9-tyne zero tillage seed drill for wheat, mustard and pulses with accurate depth control.",
      price: 800,
      unit: "day",
      location: "Hapur, Uttar Pradesh",
      owner: "Kisan Cooperative",
      phone: "+91 98765 43214"
    },
    {
      id: 6,
      name: "Shaktiman 7-Feet Heavy Rotavator",
      category: "other",
      categoryName: "Rotavator",
      icon: "⚙️",
      description: "Fine soil preparation in single pass. Compatible with 40-55 HP tractors.",
      price: 900,
      unit: "day",
      location: "Bulandshahr, Uttar Pradesh",
      owner: "Dinesh Tyagi",
      phone: "+91 98765 43215"
    }
  ];

  const filteredEquipment = equipmentList.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="rentals-page-wrapper">
      <Navbar />

      <main className="rentals-page">
        <div className="rentals-container">
          {/* Header */}
          <div className="rentals-header">
            <div>
              <span className="rentals-tag">🚜 FARM MECHANIZATION SHARING</span>
              <h1>Agricultural Equipment Rentals</h1>
              <p>
                Rent reliable tractors, combine harvesters, seeders and water pumps directly from verified nearby owners.
              </p>
            </div>

            <Link to="/home" className="back-btn">
              ← Back to Home
            </Link>
          </div>

          {/* Search Toolbar */}
          <div className="rentals-toolbar">
            <div className="rental-search">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search tractor, harvester, pump, town..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Categories */}
          <div className="rental-categories" role="tablist">
            <button
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              All Equipment
            </button>
            <button
              className={selectedCategory === "tractors" ? "active" : ""}
              onClick={() => setSelectedCategory("tractors")}
            >
              🚜 Tractors
            </button>
            <button
              className={selectedCategory === "harvesters" ? "active" : ""}
              onClick={() => setSelectedCategory("harvesters")}
            >
              🌾 Harvesters
            </button>
            <button
              className={selectedCategory === "pumps" ? "active" : ""}
              onClick={() => setSelectedCategory("pumps")}
            >
              💧 Water Pumps
            </button>
            <button
              className={selectedCategory === "seeders" ? "active" : ""}
              onClick={() => setSelectedCategory("seeders")}
            >
              🌱 Seeders
            </button>
            <button
              className={selectedCategory === "other" ? "active" : ""}
              onClick={() => setSelectedCategory("other")}
            >
              ⚙️ Rotavators & Tools
            </button>
          </div>

          {/* Equipment List Section */}
          <section className="rental-section">
            <div className="rental-results-header">
              <h3>
                Available Machinery (<span>{filteredEquipment.length}</span>)
              </h3>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  className="reset-pill"
                  onClick={() => setSelectedCategory("all")}
                >
                  Reset filter
                </button>
              )}
            </div>

            {filteredEquipment.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state-icon">🚜</span>
                <h3>No equipment found</h3>
                <p>Try searching for a different keyword or select another category filter.</p>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                >
                  View All Equipment
                </button>
              </div>
            ) : (
              <div className="rental-grid">
                {filteredEquipment.map((item) => (
                  <div className="rental-card" key={item.id}>
                    <div className="rental-image">
                      <span>{item.icon}</span>
                      <span className="rental-card-badge">{item.categoryName}</span>
                    </div>

                    <div className="rental-content">
                      <h3>{item.name}</h3>
                      <p className="rental-description">{item.description}</p>

                      <div className="rental-pricing">
                        <strong>₹{item.price}</strong>
                        <span>/ {item.unit}</span>
                      </div>

                      <div className="rental-meta">
                        <p className="rental-location">
                          📍 {item.location}
                        </p>
                        <p className="rental-owner">
                          👤 Owner: {item.owner}
                        </p>
                      </div>

                      <div className="rental-actions">
                        <a
                          href={`tel:${item.phone}`}
                          className="primary-btn rental-contact-btn"
                          style={{ textDecoration: "none", textAlign: "center" }}
                        >
                          📞 Contact Owner
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Rentals;