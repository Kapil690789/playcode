import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; // Import CSS for styling

const BACKEND_URL = "https://playcode-g265.onrender.com"; // Updated Backend URL

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store the token
      setIsAuthenticated(true); // Update authentication state
      navigate("/editor"); // Redirect to the editor page
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  // Handle guest login with predefined credentials
  const handleGuestLogin = () => {
    // Predefined credentials for guest login
    const guestEmail = "kapil@gmail.com";
    const guestPassword = "12345678";

    // Simulating a successful login by sending guest credentials
    axios
      .post(`${BACKEND_URL}/api/auth/signin`, {
        email: guestEmail,
        password: guestPassword,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token); // Store the token
        setIsAuthenticated(true); // Update authentication state
        navigate("/editor"); // Redirect to the editor page
      })
      .catch((err) => {
        console.error("Guest login failed:", err);
      });
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      {/* Guest Login Button */}
      <button onClick={handleGuestLogin} className="guest-login-btn">
        Login as Guest
      </button>
    </div>
  );
};

export default SignIn;
