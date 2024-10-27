const express = require('express');
const router = express.Router();
const { User } = require("../db/model");
const multer = require('multer');

const userprofile = async (req, res) => {
  const id = req.body.id;
  console.log(id);
  const updateduserProfile = req.body;
  try {
    const userprofile = await User.findOneAndUpdate({ id }, updateduserProfile, { new: true });
    if (userprofile) {
      res.status(200).json({ message: 'User profile updated successfully', userprofile });
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile', message: error.message });
  }
};


module.exports = {
  userprofile
};
