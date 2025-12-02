import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/authService";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage({ showToast }) {
  const navigate = useNavigate();

  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await login(useremail, password);
      console.log("Logged in:", user);
      showToast(`${useremail} login successfully!`);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center position-relative"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >

      {/* Background Image */}
      <img
        src="/img/background.jpg"
        alt="Background"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* Light Green Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(45, 78, 10, 0.19)", // light green tint
          zIndex: -1,
        }}
      ></div>

      <div className="card !rounded-2xl p-4 shadow" style={{ width: "380px" }}>
        <h2 className="text-center mb-3 text-[var(--primary)] font-semibold">Welcome to GreenCycle Market</h2>
        <p className="text-center mb-2 text-muted">Please log in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={useremail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
          type="submit"
          className="mt-3 w-100 bg-[var(--accent-btn)] text-[var(--primary)] font-semibold rounded-md py-2 transition-all"
          >
          Login
          </button>


          <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-100 border border-[var(--accent-btn)] text-[var(--primary)] font-regular rounded-md py-2 mt-3 transition-all hover:bg-[var(--accent-btn)] hover:text-[var(--primary)]"
        >
          Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
