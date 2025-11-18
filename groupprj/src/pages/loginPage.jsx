import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../service/authService'
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage({showToast}) {
  const navigate = useNavigate();

  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");


  // click Login will direct to the Home page


    async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await login(useremail, password);
      console.log("Logged in:", user);
      showToast(`${useremail} login successfully!`);
      navigate("/home")
      // redirect to dashboard
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  return (
    <div
      className=" container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "1400px", backgroundColor: "#ffffffff" }}
    >

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vid/background.mp4" type="video/mp4" />
      </video>

      <div className="card !rounded-2xl p-4 shadow" style={{ width: "380px" }}>
        <h2 className="text-center mb-3">Welcome to Kitto Market</h2>
        <p className="text-center text-muted">Please log in to continue</p>

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

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>

          <button type="button" className="btn btn-outline-secondary w-100"
          onClick = {() => navigate("/signup")}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
