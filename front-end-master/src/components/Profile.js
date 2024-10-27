import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillHome, AiOutlineSearch, AiFillFilter } from "react-icons/ai";
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const user2 = location.state;
  const navigate = useNavigate();
  //const history = useHistory();
  const goTologin = () => {
    navigate("/login", { state: user2 });
  };

  const goTohome = () => {
    navigate("/homepage", { state: user2 });
  };

  // const handleLogout = () => {
  //   // Perform logout logic here, e.g., clearing local storage, redirecting to login page, etc.
  //   // For now, let's just redirect to the homepage
  //   history.push('/login');
  // };

  return (
    <div>
      <h1>My Profile</h1>
      
      <div className="profile-details">
      {user2.image && (
  <div className="profile-picture">
    <img src={require(`../Images/${user2.image}`)} alt="Profile" />
  </div>
    )}

        <h3>{user2.fullName}</h3>
        <p>Date of Birth:{user2.dateOfBirth}</p>
        <p>Age: {user2.Age}</p>
        <p>Email: {user2.email}</p>
        <p>Address: {user2.regionalAddress}</p>
        <p>Religion: {user2.religion}</p>
        <p>Caste: {user2.caste}</p>
        <p>Qualification: {user2.qualifications}</p>
        
        {/* Add more details as needed */}
        <button className ="logout-button" onClick={goTologin}>Logout</button>
        <button className ="home-button" onClick={goTohome}>Home</button>
      </div>
    </div>
  );
};

export default Profile;
