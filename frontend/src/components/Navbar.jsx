import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="main-nav">
      <div className="left-nav">
        <h2 className="main-title">
          Travel App Guide
        </h2>
      </div>
      <div className="right-nav">
        <ul className="link">
        <Link to="/">Home</Link>
        </ul>
        <ul className="link">
          <Link to="/register">Register</Link>
        </ul>
        <ul className="link">
          <Link>Login</Link>
        </ul>
        <ul className="link">
          <Link>Planner</Link>
        </ul>
      </div>
      
      
    </nav>
  )
}

export default Navbar