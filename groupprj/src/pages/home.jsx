// src/Home.jsx
import React from 'react';
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';




export default function Home() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login')
  };

const sampleVideo = {
    description: "Choose your next step towards environment-friendly industry.",
    url: "https://youtu.be/dQw4w9WgXcQ?si=Tj1E93eF8MCgeT7D"
  }

  const nextPage = {
    url: "https://blog.webdevsimplified.com/2022-01/js-fetch-api/"
  }

  return (
    <>
      <div>
        <a href="https://vite.dev/guide/" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      
      <h1>Welcome to Kitt:o</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Video video = {sampleVideo}/>
      <br/>
    <NextPage page = {nextPage}
    handleClick = {handleClick}/>

    <br/>




    </>
  )
}

function Video({ video }) {
  return (
    <div>
      <a href={video.url}>
        <h3>{video.title1}</h3>
        <p>{video.description}</p>
      </a>
      <button onClick = {() => window.open(video.url, '_blank')}>
        Get 50$ for free
      </button>

    </div>
  );
}


function NextPage({ handleClick }) {
  return (
    <div>
      <button onClick = {handleClick}>
        Next
      </button>
    </div>
  );
}
  
  

