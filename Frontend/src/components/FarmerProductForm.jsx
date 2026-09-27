import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getFarmerProductById,
  updateProduct
} from "../services/FarmerProductService";
import { uploadImageToCloudinary } from "../services/UploadService";

function FarmerProductForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    category: "Wheat",
    description: "",
    price: "",
    quantity: "",
    unit: "quintal",
    location: "",
    image: ""
  });
  
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  
  const categories = [
    "Wheat",
    "Rice",
    "Maize",
    "Pulses",
    "Vegetables",
    "Fruits",
    "Seeds",
    "Spices",
    "Oilseeds",
    "Other"
  ];
      
  const units = [
    { label: "Kilogram (kg)", value: "kg" },
    { label: "Quintal", value: "quintal" },
    { label: "Ton", value: "ton" },
    { label: "Piece", value: "piece" },
    { label: "Liter", value: "liter" }
  ];

  useEffect(() => {
    if (isEdit && id) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const data = await getFarmerProductById(id);
          if (data && data.product) {
            setFormData({
              name: data.product.name || "",
              category: data.product.category || "Wheat",
              description: data.product.description || "",
              price: data.product.price !== undefined ? data.product.price : "",
              quantity: data.product.quantity !== undefined ? data.product.quantity : "",
              unit: data.product.unit || "quintal",
              location: data.product.location || "",
              image: data.product.image || ""
            });
          }
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || "Unable to load product for editing");
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetails();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image file size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        setUploadingImage(true);
        setError("");
        const res = await uploadImageToCloudinary(reader.result);
        if (res && res.url) {
          setFormData((prev) => ({ ...prev, image: res.url }));
        }
      } catch (err) {
        console.error("Upload error:", err);
        setError("Cloudinary image upload failed. Please check backend connection or provide image URL.");
      } finally {
        setUploadingImage(false);
      }
    };
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Product name is required";
    if (!formData.category.trim()) return "Category is required";
    if (!formData.description.trim()) return "Description is required";
    
    if (formData.price === "" || formData.price === null || isNaN(formData.price)) {
      return "Price is required";
    }
    if (Number(formData.price) < 0) {
      return "Price cannot be negative";
    }

    if (formData.quantity === "" || formData.quantity === null || isNaN(formData.quantity)) {
      return "Quantity is required";
    }
    if (Number(formData.quantity) < 0) {
      return "Quantity cannot be negative";
    }

    if (!formData.unit.trim()) return "Unit is required";
    if (!formData.location.trim()) return "Location is required";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        unit: formData.unit.trim(),
        location: formData.location.trim(),
        image: formData.image.trim()
      };

      if (isEdit) {
        await updateProduct(id, payload);
        navigate("/farmer/products", {
          state: { message: "Product updated successfully" }
        });
      } else {
        await createProduct(payload);
        navigate("/farmer/products", {
          state: { message: "Product listed successfully!" }
        });
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        `Unable to ${isEdit ? "update" : "create"} product`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="products-page" style={{ display: "flex", justifyContent: "center", paddingTop: "80px" }}>
        <h3>Loading product details...</h3>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <Link to="/farmer/products" className="back-btn">
            ← Back to My Products
          </Link>
          <h1 style={{ marginTop: "12px" }}>
            {isEdit ? "Edit Product" : "Sell Your Farm Product"}
          </h1>
          <p>
            {isEdit
              ? "Update your product listing details below."
              : "Connect directly with consumers and sell without middlemen."}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="add-product-card" style={{ background: "white", padding: "32px", borderRadius: "18px", border: "1px solid #e5e7eb" }}>
          {error && (
            <div className="error-message" style={{ padding: "14px", backgroundColor: "#fef2f2", color: "#b91c1c", borderRadius: "10px", marginBottom: "20px" }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* 1. Basic Information */}
            <h3 style={{ fontSize: "18px", color: "#1e293b", marginBottom: "16px", paddingBottom: "8px", borderBottom: "2px solid #e2e8f0" }}>
              Basic Information
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  Product Name <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Premium Basmati Rice"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Category <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>
                  Description <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your crop quality, harvest date, organic status..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* 2. Pricing & Quantity */}
            <h3 style={{ fontSize: "18px", color: "#1e293b", margin: "28px 0 16px 0", paddingBottom: "8px", borderBottom: "2px solid #e2e8f0" }}>
              Pricing & Quantity
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  Price (₹) <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="₹ Price per unit"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="any"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Quantity Available <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Available stock"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  step="any"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>
                  Unit <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                >
                  {units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Location */}
            <h3 style={{ fontSize: "18px", color: "#1e293b", margin: "28px 0 16px 0", paddingBottom: "8px", borderBottom: "2px solid #e2e8f0" }}>
              Location
            </h3>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>
                  Farm / Pickup Location <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Village Rampur, Ghaziabad, UP"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* 4. Product Image */}
            <h3 style={{ fontSize: "18px", color: "#1e293b", margin: "28px 0 16px 0", paddingBottom: "8px", borderBottom: "2px solid #e2e8f0" }}>
              Product Image
            </h3>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Upload Crop Image to Cloudinary</label>

                {/* Upload Controls */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <label
                      htmlFor="cloudinary-file-input"
                      style={{
                        padding: "10px 18px",
                        backgroundColor: "#16a34a",
                        color: "#ffffff",
                        borderRadius: "10px",
                        fontWeight: "600",
                        fontSize: "14px",
                        cursor: uploadingImage ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)"
                      }}
                    >
                      ☁️ {uploadingImage ? "Uploading to Cloudinary..." : "Choose Image File"}
                    </label>

                    <input
                      id="cloudinary-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      style={{ display: "none" }}
                    />

                    {uploadingImage && (
                      <span style={{ fontSize: "14px", color: "#16a34a", fontWeight: "600" }}>
                        ⏳ Uploading image, please wait...
                      </span>
                    )}
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "12px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "12px",
                      marginTop: "8px"
                    }}>
                      <img
                        src={formData.image}
                        alt="Crop Preview"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          border: "2px solid #22c55e"
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          backgroundColor: "#dcfce7",
                          color: "#166534",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          marginBottom: "4px"
                        }}>
                          ☁️ Cloudinary Uploaded
                        </span>
                        <p style={{ margin: 0, fontSize: "12px", color: "#64748b", wordBreak: "break-all" }}>
                          {formData.image}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          border: "1px solid #fecaca",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}

                  {/* Manual URL Input fallback */}
                  <div style={{ marginTop: "8px" }}>
                    <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>
                      Or enter image URL directly:
                    </label>
                    <input
                      type="url"
                      name="image"
                      placeholder="https://example.com/crop-image.jpg"
                      value={formData.image}
                      onChange={handleChange}
                      style={{ marginTop: "4px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "14px", marginTop: "32px" }}>
              <button
                type="submit"
                className="primary-btn"
                disabled={submitting}
                style={{ flex: 1, padding: "14px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
              >
                {submitting
                  ? (isEdit ? "Updating..." : "Saving...")
                  : (isEdit ? "Update Product" : "Save Product")}
              </button>

              <Link
                to="/farmer/products"
                className="secondary-btn"
                style={{
                  padding: "14px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "inline-block"
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmerProductForm;