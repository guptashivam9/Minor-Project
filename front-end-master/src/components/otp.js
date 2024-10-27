import React, { useState } from 'react';
import './otp.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function OTPVerification() {

  const location =  useLocation();
  const id = location.state;
  
  const [otp, setOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate();
  
  // Function to handle OTP verification
  const verifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:5001/verifyotp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setVerificationStatus(data.message);
        navigate("/image/", { state: id });
      } else {
        setVerificationStatus('*Error verifying OTP*. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setVerificationStatus('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className = "otp">
      <h2>Enter OTP</h2>
      <input 
        type="text" 
        value={otp} 
        onChange={(e) => setOTP(e.target.value)} 
        placeholder="Enter OTP" 
      />
      <button onClick={verifyOTP}>Verify OTP</button>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default OTPVerification;
