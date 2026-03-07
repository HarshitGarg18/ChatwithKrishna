import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://chatwithkrishna.onrender.com/api/auth";

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const res = await axios.post(
        `${API}/signup`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(`Swagat hai, ${res.data.user.name}!`);

      navigate("/chat");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Registration failed. Shayad email pehle se hai?"
      );

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="app-container" style={{ justifyContent: "center" }}>

      <div className="chat-window" style={{ height: "auto", padding: "40px", maxWidth: "400px" }}>

        <h2 style={{ color: "#ea580c", textAlign: "center", marginBottom: "20px" }}>
          NAYA KHATA BANAYEIN
        </h2>

        {error && (
          <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >

          <input
            type="text"
            name="name"
            placeholder="Aapka Shubh Naam (e.g. Parth)"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Ek Majboot Password"
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "DATA BHEJ RAHE HAIN..." : "REGISTER KAREIN"}
          </button>

        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          <span>Pehle se khata hai? </span>

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            Login Karein
          </Link>

        </div>

      </div>

      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        "Apne safar ki shuruat karein"
      </p>

    </div>
  );

};

export default Signup;