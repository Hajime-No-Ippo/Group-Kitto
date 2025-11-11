import React, { useState, useEffect } from 'react';
import Data from "../Data/clothesData";
import { useNavigate } from 'react-router-dom';
import "./style/clothes.css";

export default function clothes(){
    const [clothes, setClothes] = useState("clothes")

    function onSearchFormChange(event){
    setClothes(event.target.value)
  }

    const navigate = useNavigate();

    const handleClick = () =>{
    navigate('/menu')
  };

    return(
        <>
        <br/>
        <h2>You can search the {clothes} category here!</h2>
        <input onChange = {onSearchFormChange} type = 'text' placeholder = "Search by category" ></input>
        <br/>
        <Back handleClick = {handleClick}/>
        <hr/>
        <Data clothes = {clothes}/>
        </>
    )
};

  function Back({ handleClick }){
    return(
    <button className = 'backButton' onClick={handleClick}>
        Back to First Page
      </button>
    )
  }
