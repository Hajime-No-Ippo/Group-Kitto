import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css'

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("")
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/')
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    
    if(value === "chat"){
      navigate("/chat");
    }else if(value === "clothes"){
      navigate("/clothes")
    }else if(value === "books"){
      navigate("/books")
    }else if(value === "edu"){
      navigate("/edu")
    }else if(value === "exchangeProduct"){
      navigate("/exchangeProduct")
    }
  }

  return(
    
    <div className = 'Container'>
    <h1>This is the Menu Page</h1>

    <select
      value={selectedValue}
      onChange={handleSelectChange}
      className="my-custom-select"
      >
      <option value="">Select your sustainable plan</option>
      <option value="exchangeProduct">Product exchange</option>
      <option value="books">Books Exchange</option>
      <option value="clothes">Clothes Exchange</option>
      <option value="chat">Chatting Channel</option>
      <option value="edu">Reels</option> //Education of Sustainability
    </select>

      <br/>
      <Back handleClick = {handleClick}/>
    </div>
    
  );
  }

  function Back({ handleClick }){
    return(
    <button className = 'backButton' onClick={handleClick}>
        Back to First Page
      </button>
    )
  }

  