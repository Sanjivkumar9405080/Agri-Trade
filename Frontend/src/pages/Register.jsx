import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      try {
        navigate("/home", { replace: true });
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  // Selected role
  const [role, setRole] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Error message
  const [error, setError] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("REGISTER BUTTON CLICKED");
    console.log("Selected Role:", role);
    console.log("Form Data:", formData);

    // Role validation
    if (!role) {
      setError("Please select Farmer or Consumer");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...formData,
            role: role,
          }),
        }
      );

      const data = await response.json();

      console.log("Register Response:", data);

      // Backend error
      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Success
      alert("Registration successful!");

      // Go to login
      navigate("/login");

    } catch (err) {
      console.error("Registration Error:", err);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card register-card">

        {/* Logo */}

        <div className="auth-logo">
          🌾 AgriTrade
        </div>


        {/* Heading */}

        <h1>
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join the direct farm marketplace
        </p>


        {/* Error */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {/* Role Selection */}

        <h3 className="role-title">
          What are you?
        </h3>


        <div className="role-selection">

          {/* Farmer */}

          <button
            type="button"
            className={`role-card ${
              role === "farmer" ? "selected" : ""
            }`}
            onClick={() => {
              setRole("farmer");
              setError("");
            }}
          >

            <span>
              🌾
            </span>

            <strong>
              Farmer
            </strong>

            <small>
              Sell farm products
            </small>

          </button>


          {/* Consumer */}

          <button
            type="button"
            className={`role-card ${
              role === "consumer" ? "selected" : ""
            }`}
            onClick={() => {
              setRole("consumer");
              setError("");
            }}
          >

            <span>
              🛒
            </span>

            <strong>
              Consumer
            </strong>

            <small>
              Buy farm products
            </small>

          </button>

        </div>


        {/* Registration Form */}

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />


          {/* Email */}

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          {/* Phone */}

          <label>
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />


          {/* Address */}

          <label>
            Address
          </label>

          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />


          {/* Password */}

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />


          {/* Submit */}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* Login */}

        <p className="auth-bottom">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;