import { Link } from "react-router-dom";

function Rentals() {
  return (
    <div className="rentals-page">

      {/* Header */}
      <div className="rentals-header">

        <div>
          <h1>🚜 Farming Equipment Rentals</h1>

          <p>
            Rent farming equipment directly from owners.
          </p>
        </div>

        <Link
          to="/farmer-dashboard"
          className="back-btn"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Search */}
      <div className="rental-search">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search tractor, harvester, pump..."
        />

      </div>


      {/* Categories */}
      <div className="rental-categories">

        <button>
          🚜 Tractors
        </button>

        <button>
          🌾 Harvesters
        </button>

        <button>
          💧 Water Pumps
        </button>

        <button>
          🌱 Seeders
        </button>

        <button>
          ⚙️ Other Equipment
        </button>

      </div>


      {/* Equipment */}
      <section className="rental-section">

        <div className="section-title">

          <div>
            <h2>
              Available Equipment
            </h2>

            <p>
              Find equipment for your farming needs.
            </p>
          </div>

        </div>


        <div className="rental-grid">

          {/* Tractor */}

          <div className="rental-card">

            <div className="rental-image">
              🚜
            </div>

            <div className="rental-content">

              <span className="rental-category">
                Tractor
              </span>

              <h3>
                Mahindra Tractor
              </h3>

              <p>
                Powerful tractor suitable for
                agricultural field work.
              </p>

              <strong>
                ₹1200 / day
              </strong>

              <p>
                📍 Ghaziabad
              </p>

              <button className="primary-btn">
                View Details
              </button>

            </div>

          </div>


          {/* Harvester */}

          <div className="rental-card">

            <div className="rental-image">
              🌾
            </div>

            <div className="rental-content">

              <span className="rental-category">
                Harvester
              </span>

              <h3>
                Crop Harvester
              </h3>

              <p>
                Efficient harvesting equipment
                for different crops.
              </p>

              <strong>
                ₹2500 / day
              </strong>

              <p>
                📍 Ghaziabad
              </p>

              <button className="primary-btn">
                View Details
              </button>

            </div>

          </div>


          {/* Water Pump */}

          <div className="rental-card">

            <div className="rental-image">
              💧
            </div>

            <div className="rental-content">

              <span className="rental-category">
                Water Pump
              </span>

              <h3>
                Agricultural Water Pump
              </h3>

              <p>
                Water pump for irrigation
                and farming.
              </p>

              <strong>
                ₹500 / day
              </strong>

              <p>
                📍 Ghaziabad
              </p>

              <button className="primary-btn">
                View Details
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Rentals;