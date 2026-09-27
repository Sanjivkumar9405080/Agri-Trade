import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProfile,
  updateProfile
} from "../services/ProfileService";
import { uploadImageToCloudinary } from "../services/UploadService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profilePhoto: "",

    farmerType: "",
    farmSize: "",
    farmingExperience: "",
    mainCrops: [],

    consumerType: "",
    businessName: "",
    businessType: "",
    deliveryAddress: ""
  });


  // ==============================
  // GET PROFILE
  // ==============================

  useEffect(() => {

    const localUserStr = localStorage.getItem("user");
    let localUser = null;
    if (localUserStr) {
      try {
        localUser = JSON.parse(localUserStr);
        setUser(localUser);
        setFormData({
          name: localUser.name || "",
          phone: localUser.phone || "",
          address: localUser.address || "",
          city: localUser.city || "",
          state: localUser.state || "",
          pincode: localUser.pincode || "",
          profilePhoto: localUser.profilePhoto || "",

          farmerType: localUser.farmerType || "",
          farmSize: localUser.farmSize || "",
          farmingExperience: localUser.farmingExperience || "",
          mainCrops: localUser.mainCrops || [],

          consumerType: localUser.consumerType || "",
          businessName: localUser.businessName || "",
          businessType: localUser.businessType || "",
          deliveryAddress: localUser.deliveryAddress || ""
        });
      } catch (e) {
        console.error("Error parsing local user", e);
      }
    }

    const fetchProfile = async () => {

      try {

        const data = await getProfile();

        if (data && data.user) {
          setUser(data.user);

          setFormData({
            name: data.user.name || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            state: data.user.state || "",
            pincode: data.user.pincode || "",
            profilePhoto: data.user.profilePhoto || "",

            farmerType: data.user.farmerType || "",
            farmSize: data.user.farmSize || "",
            farmingExperience: data.user.farmingExperience || "",
            mainCrops: data.user.mainCrops || [],

            consumerType: data.user.consumerType || "",
            businessName: data.user.businessName || "",
            businessType: data.user.businessType || "",
            deliveryAddress: data.user.deliveryAddress || ""
          });
        }

      } catch (err) {

        console.error(err);

        if (!localUser) {
          setError(
            err.response?.data?.message ||
            "Unable to load profile"
          );
        }

      } finally {

        setLoading(false);
      }
    };

    fetchProfile();

  }, []);


  // ==============================
  // HANDLE PHOTO UPLOAD
  // ==============================

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        setUploadingPhoto(true);
        setError("");
        setMessage("");

        const res = await uploadImageToCloudinary(reader.result);

        if (res && res.url) {
          const updatedFormData = {
            ...formData,
            profilePhoto: res.url
          };

          setFormData(updatedFormData);

          // Save photo update to backend immediately
          const data = await updateProfile(updatedFormData);
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));

          setMessage("Profile photo updated successfully!");
        }
      } catch (err) {
        console.error("Profile photo upload error:", err);
        setError("Failed to upload profile photo. Please try again.");
      } finally {
        setUploadingPhoto(false);
      }
    };
  };


  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==============================
  // HANDLE CROPS
  // ==============================

  const handleCropsChange = (e) => {

    const crops = e.target.value
      .split(",")
      .map((crop) => crop.trim())
      .filter(Boolean);

    setFormData({
      ...formData,
      mainCrops: crops
    });

  };


  // ==============================
  // UPDATE PROFILE
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setMessage("");
      setError("");

      const data = await updateProfile(formData);

      setUser(data.user);

      setMessage("Profile updated successfully!");

      // Update localStorage user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to update profile"
      );

    } finally {

      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="profile-loading">
        Loading profile...
      </div>
    );
  }


  if (!user) {
    return (
      <div className="profile-loading">
        {error || "Profile not found"}
      </div>
    );
  }


  return (
    <div className="profile-page-wrapper">
      <Navbar />

      <div className={`profile-page ${user.role}-theme`}>

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="profile-header">

        <Link
          to={
            user.role === "farmer"
              ? "/farmer-dashboard"
              : "/consumer-dashboard"
          }
          className="back-btn"
        >
          ← Dashboard
        </Link>

        <h1>My Profile</h1>

        <span className={`profile-role ${user.role}`}>
          {user.role === "farmer"
            ? "🌾 Farmer"
            : "🛒 Consumer"}
        </span>

      </div>


      {/* ================================= */}
      {/* PROFILE CARD */}
      {/* ================================= */}

      <div className="profile-container">

        <div className="profile-card">

          {/* PROFILE PHOTO */}

          <div className="profile-photo-section">

            <div
              className={`profile-photo ${user.role}`}
              onClick={() => document.getElementById("profile-photo-file-input").click()}
              style={{
                cursor: "pointer",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              title="Click to upload/change profile photo"
            >

              {formData.profilePhoto || user.profilePhoto ? (

                <img
                  src={formData.profilePhoto || user.profilePhoto}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />

              ) : (

                user.role === "farmer"
                  ? "🌾"
                  : "🛒"

              )}

              {/* Camera Icon Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  backgroundColor: user.role === "farmer" ? "#16a34a" : "#0284c7",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  border: "2px solid #ffffff",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
                }}
              >
                📷
              </div>

            </div>

            <input
              id="profile-photo-file-input"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />

            {uploadingPhoto && (
              <p style={{ color: "#16a34a", fontSize: "14px", fontWeight: "700", marginTop: "8px" }}>
                ⏳ Uploading profile photo to Cloudinary...
              </p>
            )}

            <h2>{user.name}</h2>

            <p>
              {user.role === "farmer"
                ? "Farmer"
                : "Consumer"}
            </p>

            <button
              type="button"
              onClick={() => document.getElementById("profile-photo-file-input").click()}
              style={{
                background: "none",
                border: "none",
                color: user.role === "farmer" ? "#16a34a" : "#0284c7",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
                marginTop: "4px"
              }}
            >
              📷 Change Profile Photo
            </button>

          </div>


          {/* MESSAGE */}

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* ================================= */}
          {/* FORM */}
          {/* ================================= */}

          <form onSubmit={handleSubmit}>

            <h3>Basic Information</h3>


            <div className="form-grid">

              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  value={user.email}
                  disabled
                />

              </div>


              <div className="form-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* ================================= */}
            {/* FARMER INFORMATION */}
            {/* ================================= */}

            {user.role === "farmer" && (

              <>

                <h3>Farmer Information</h3>

                <div className="form-grid">

                  <div className="form-group">

                    <label>Farmer Type</label>

                    <select
                      name="farmerType"
                      value={formData.farmerType}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Type
                      </option>

                      <option value="Individual Farmer">
                        Individual Farmer
                      </option>

                      <option value="Farm Owner">
                        Farm Owner
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Farm Size (Acres)
                    </label>

                    <input
                      type="number"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      min="0"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Farming Experience (Years)
                    </label>

                    <input
                      type="number"
                      name="farmingExperience"
                      value={
                        formData.farmingExperience
                      }
                      onChange={handleChange}
                      min="0"
                    />

                  </div>


                  <div className="form-group full-width">

                    <label>
                      Main Crops
                    </label>

                    <input
                      type="text"
                      placeholder="Rice, Wheat, Potato"
                      value={
                        formData.mainCrops.join(", ")
                      }
                      onChange={handleCropsChange}
                    />

                    <small>
                      Separate crops with commas
                    </small>

                  </div>

                </div>

              </>

            )}


            {/* ================================= */}
            {/* CONSUMER INFORMATION */}
            {/* ================================= */}

            {user.role === "consumer" && (

              <>

                <h3>Consumer Information</h3>

                <div className="form-grid">

                  <div className="form-group">

                    <label>Consumer Type</label>

                    <select
                      name="consumerType"
                      value={formData.consumerType}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Type
                      </option>

                      <option value="Individual">
                        Individual
                      </option>

                      <option value="Business">
                        Business
                      </option>

                    </select>

                  </div>


                  {formData.consumerType ===
                    "Business" && (

                    <>

                      <div className="form-group">

                        <label>
                          Business Name
                        </label>

                        <input
                          type="text"
                          name="businessName"
                          value={
                            formData.businessName
                          }
                          onChange={handleChange}
                        />

                      </div>


                      <div className="form-group">

                        <label>
                          Business Type
                        </label>

                        <input
                          type="text"
                          name="businessType"
                          placeholder="Restaurant, Shop..."
                          value={
                            formData.businessType
                          }
                          onChange={handleChange}
                        />

                      </div>

                    </>

                  )}


                  <div className="form-group full-width">

                    <label>
                      Delivery Address
                    </label>

                    <textarea
                      name="deliveryAddress"
                      value={
                        formData.deliveryAddress
                      }
                      onChange={handleChange}
                      rows="3"
                    />

                  </div>

                </div>

              </>

            )}


            {/* ================================= */}
            {/* SAVE */}
            {/* ================================= */}

            <button
              type="submit"
              className={`save-profile-btn ${user.role}`}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </div>

      </div>

    </div>

    <Footer />
  </div>
  );
}

export default Profile;