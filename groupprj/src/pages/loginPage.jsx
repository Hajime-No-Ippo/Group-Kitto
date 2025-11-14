import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // click Login will direct to the Home page
  const handleLogin = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // 这里以后加入真正的验证逻辑
    navigate("/home");
=======
  const loginToMenu = () => {
    window.open(window.location.origin + '/menu', '_blank', 'noopener,noreferrer');
  }

return(
    <>
    <h1>Hello, Welcome!  {title1}</h1>
      <form>
        <p>UserName:</p><input onChange= {setTi1} type="text"></input>
        <br/>      
        <p>Password:</p><input onChange= {setTi2} type="password"></input>
      <div className="card">

     
      <LoginToMenu loginToMenu = {loginToMenu}/>
      <br/>
        <sbt type = "submit">
          Clicking on accepting all GDPR conditions
        </sbt>
      </div>
      </form>

   
      <br/>
      <Back navigate = {navigate}/>
      <PassCodeValidate password = {password}/>
      <br/>



    </>
);
}




function Back({ navigate }) {
  return (
    <div>
      <button onClick = {()=> navigate('/')}>
        Back
      </button>
    </div>
  );
}


function PassCodeValidate({  }) {
    const userName = 'Chenming'
    const handleCheck = () => {
    if (userName === validUser && password === validPass) {
      onSuccess();    // e.g., navigate, show success UI, etc.
    } else {
      onFailure();    // e.g., show error message
    }
>>>>>>> 783a074 (My local updates)
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h2 className="text-center mb-3">Welcome to Kitto Market</h2>
        <p className="text-center text-muted">Please log in to continue</p>

        <form onSubmit={handleLogin}>
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
            Login
          </button>

          <button type="button" className="btn btn-outline-secondary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
