const express = require('express');
const router = express.Router();
const { generateOTP } = require("./otp");

let cachedOTP = null; // Variable to cache the generated OTP

const verifyotp = async (req, res) => {
  try {
    const { otp: userOTP } = req.body;
    const generatedOTP = generateOTP(); // Use the generateOTP function to get the OTP
    console.log("Received OTP:", userOTP);
    console.log("Generated OTP:", generatedOTP);
    
    // Check if the OTP provided by the user matches the generated OTP
    if (userOTP === generatedOTP) {
      // OTP is correct
      return res.status(200).json({ success: true, message: 'OTP verification successful' });
    } else {
      // OTP is incorrect
      return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    return res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};

module.exports = { verifyotp };
