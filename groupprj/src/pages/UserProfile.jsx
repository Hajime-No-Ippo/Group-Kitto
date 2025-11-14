import React from 'react'
import { useEffect } from 'react'
import UserInfoCard from '../component/UserInfoCard.jsx'

const UserProfile = () => {
  // Function to navigate back to home page
    const navigate = (path) => {
        window.location.href = path;
    }

    useEffect(() => {
        // Fetch user profile data when the component mounts
    }, [])  
  return (
    <div>
      <UserInfoCard/>
      <button className = "" onClick={() => navigate("/home")}>Back</button>
    </div>
  )
}

export default UserProfile