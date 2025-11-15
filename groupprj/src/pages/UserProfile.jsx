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
    <>
      <div className="flex align-right gap-6 m-6">
        <button
        className="btn btn-outline-secondary mt-2 mb-4"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>
      </div>
    <div>
      <UserInfoCard/>
    </div>
    </>
  )
}

export default UserProfile