import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/login.css'


function LoginPage() {

      const navigate = useNavigate();
      const [title1, setTitle1] = useState(" sustainable future leader.")
      const [password, setPassword2] = useState("")

    
      function setTi2(event){
        setPassword2(event.target.value)
      }
    
      function setTi1(event){
        setTitle1(event.target.value)
      }

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
          Collecting on accepting all GDPR conditions
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
  };

  return (
    <div>

    </div>
  );
}

function LoginToMenu({ loginToMenu }) {
  return (
    <div className="buttonContainer">
      <button className = "loginButton" onClick = {loginToMenu}>
        Login
      </button>
      <br />
      <button className = "signUpButton">
        Sign Up
      </button>
    </div>
  );
}




export default LoginPage;