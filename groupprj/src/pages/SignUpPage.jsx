import React from 'react'
import { signUp } from '../service/authService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = ({showToast}) => {
      const navigate = useNavigate();
      const [useremail, setUserEmail] = useState("");
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      
      const handleLogin = (e) => {
        e.preventDefault();
        showToast(`${username} login successfully!`);
        // 这里以后加入真正的验证逻辑
        navigate("/home")
        
    };

  return (
    <>
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
        <p className="text-center text-muted">You can Sign Up here</p>

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
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            Sign Up
          </button>

          <button type="button" className="btn btn-outline-secondary w-100"
          onClick = {() => navigate("/")}>
            Back to Login
          </button>
        </form>
    </div>

    </div>
    
      </>
)

}

export default SignUpPage