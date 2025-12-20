import React from "react";
import { signUp } from "../service/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ showToast }) => {
  const navigate = useNavigate();
  const [useremail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handlesignUp(e) {
    e.preventDefault();
    try {
      const newUser = await signUp(useremail, username, password);
      console.log("New User:", newUser);
      // redirect to dashboard
    } catch (err) {
      alert(
        "This email is already registered. Try logging in instead." +
          err.message
      );
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    showToast(`${username} login successfully!`);
    // 这里以后加入真正的验证逻辑
    navigate("/home");
  };

  return (
    <>
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

        <div
          className="card !rounded-2xl p-4 shadow"
          style={{ width: "380px" }}
        >
          <h2 className="text-center mb-3 text-[var(--primary)] font-semibold">Welcome to GreenCycle Market</h2>
          <p className="text-center mb-2 text-muted">You can Sign Up here</p>

          <form onSubmit={handlesignUp}>
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
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            Sign Up
            </button>

            <button
              type="button"
              className="w-100 border border-[var(--accent-btn)] text-[var(--primary)] font-regular rounded-md py-2 mt-3 transition-all hover:bg-[var(--accent-btn)] hover:text-[var(--primary)]"
              onClick={() => navigate("/")}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
