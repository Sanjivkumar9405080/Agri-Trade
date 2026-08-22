import React from "react";

function FarmerProfileModal({ farmer, onClose }) {
  if (!farmer) return null;

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div className="modal-content" style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        maxWidth: "500px",
        width: "100%",
        padding: "28px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        position: "relative",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b"
          }}
        >
          ✕
        </button>

        {/* Header / Avatar */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            margin: "0 auto 12px auto",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
          }}>
            {farmer.profilePhoto ? (
              <img
                src={farmer.profilePhoto}
                alt={farmer.name}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              "👨‍🌾"
            )}
          </div>
          <h2 style={{ margin: "0 0 4px 0", color: "#1e293b", fontSize: "22px" }}>
            {farmer.name || "Farmer"}
          </h2>
          <span style={{
            display: "inline-block",
            padding: "4px 12px",
            backgroundColor: "#dcfce7",
            color: "#166534",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "600"
          }}>
            🌾 Verified Farmer
          </span>
        </div>

        {/* Contact Info */}
        <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "15px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            📞 Contact Details
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px", color: "#334155" }}>
            {farmer.phone && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span><strong>Phone:</strong> {farmer.phone}</span>
                <a
                  href={`tel:${farmer.phone}`}
                  style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  Call Now
                </a>
              </div>
            )}

            {farmer.email && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span><strong>Email:</strong> {farmer.email}</span>
                <a
                  href={`mailto:${farmer.email}`}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  Email
                </a>
              </div>
            )}

            {(farmer.address || farmer.city || farmer.state) && (
              <div style={{ marginTop: "4px" }}>
                <strong>Location:</strong>{" "}
                {[farmer.address, farmer.city, farmer.state].filter(Boolean).join(", ")}
              </div>
            )}
          </div>
        </div>

        {/* Farm & Produce Details */}
        <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "15px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            🌾 Farm & Crop Information
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px", color: "#334155" }}>
            {farmer.farmerType && (
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Farmer Type</span>
                <strong>{farmer.farmerType}</strong>
              </div>
            )}

            {farmer.farmSize !== undefined && farmer.farmSize > 0 && (
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Farm Size</span>
                <strong>{farmer.farmSize} Acres</strong>
              </div>
            )}

            {farmer.farmingExperience !== undefined && farmer.farmingExperience > 0 && (
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Experience</span>
                <strong>{farmer.farmingExperience} Years</strong>
              </div>
            )}

            {farmer.mainCrops && farmer.mainCrops.length > 0 && (
              <div style={{ gridColumn: "1 / -1" }}>
                <span style={{ color: "#64748b", display: "block" }}>Main Crops Raised</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                  {farmer.mainCrops.map((crop, idx) => (
                    <span key={idx} style={{
                      backgroundColor: "#e2e8f0",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "13px"
                    }}>
                      🌾 {crop}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#f1f5f9",
            color: "#475569",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default FarmerProfileModal;
