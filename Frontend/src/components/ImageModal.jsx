import React from "react";

function ImageModal({ imageUrl, title, onClose }) {
  if (!imageUrl) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "20px",
        cursor: "zoom-out"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0f172a",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          cursor: "default"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10
          }}
        >
          ✕
        </button>

        {title && (
          <h3 style={{ margin: "0 0 12px 0", color: "#f8fafc", fontSize: "18px", textAlign: "center" }}>
            🌾 {title}
          </h3>
        )}

        <img
          src={imageUrl}
          alt={title || "Product Preview"}
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
          }}
        />
      </div>
    </div>
  );
}

export default ImageModal;
