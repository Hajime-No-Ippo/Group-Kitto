import React from 'react'
import '../style/nav.module.css'
const Nav = () => {
  return (
    <div>
        <div className = 'header' >
            <div className = 'logo'>
                <h2>Kit<span>To</span></h2>
                </div>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Product</a></li>
                    <li><a href='#'>About</a></li>
                    <li><a href='#'>My Profile</a></li>
                </ul>
            </div>
    </div>
  )
}

export default Nav