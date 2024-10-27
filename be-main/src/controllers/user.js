const expressAsyncHandler = require("express-async-handler");
const express = require('express');
const router = express.Router();
const { User } = require("../db/model");
const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
const sendEmail = require("./sendEmail");
const verifyotp =require ("./otpverify");



const loginUser = async (req, res) => {
  console.log("logged in");
  const user = await User.findOne({
    email: req.body.Email,
    password: req.body.Password,
    
  });
  if (user) {
    res.status(200).send({user:user });
  } else {
    res.status(400).send({ error: "Invalid username or password" });
  }
  
};

const signUpUser = async (req, res) => {
  const lastUser = await User.findOne({}, null, { sort: { id: -1 } });
  const {FullName,Email, Password } = req.body;
  const usernameUser = await User.findOne({ email:Email });
    if (usernameUser) {
      return res.status(400).send({ error: "Email already taken" });
    }

    try {
      await sendEmail      // Assuming sendEmail is async and expects req, res
    }
     catch(res){
      console.log(res.body)
    }
    //  catch (error) {
    //   return res.status(900).json({ message: 'Error sending email', error: error.message });
    // }
    
// try {
//   await verifyotp      
//   }
//    catch (error) {
//     return res.status(19).json({ message: 'Error', error: error.message });
//   }

    let id = 1;
    if (lastUser) {
      id = lastUser.id + 1;
    }
  
  console.log( id,FullName, Email,Password);
    try {
      const newUser = new User(
        { id: id ,username : FullName, email : Email, password :Password});
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully',id:id });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };


  const getFeed = async (req, res) => {
    try {
        // Get user's gender from the request query parameters
        const userGender = req.query.gender;
        console.log(userGender);

    
        // Filter profiles based on the user's gender, age, religion, caste, location, and education level
    
        const maxAge = req.query.maxage;
        console.log(maxAge);
        const minAge = req.query.minage;
        console.log(minAge);

        const userReligion = req.query.Religion;
        console.log(userReligion);


        const userCaste = req.query.Caste;
        console.log(userCaste);


        const userLocation = req.query.Location;
        console.log(userLocation);


        // const userEducation = req.query.Education;
        // console.log(userEducation);

        
     

        // Determine the opposite gender
        const oppositeGender = userGender === 'male' ? 'female' : 'male';
            
         
        //if ( oppositeGender  && userCaste && userLocation && {userEducation} && userReligion && maxAge && minAge) {
          if ( oppositeGender  && userCaste && userLocation  && userReligion && maxAge && minAge) {
          const profiles = await User.find({   gender: oppositeGender,religion: userReligion,
            caste: userCaste, regionalAddress: userLocation, Age:{ $gte: minAge, $lte: maxAge }
           // qualifications: userEducation,
            
          }).sort ({ _id: -1 });
          console.log("filter")

          res.status(200).json(profiles);
 }

 else {
        // Fetch profiles of the opposite gender, sorted by ID in descending order
        const profiles = await User.find({ gender: oppositeGender, 
                                
                                        
                                        }).sort({ _id: -1 });

        res.status(200).json(profiles);
                                      }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
};



module.exports = {
  loginUser,
  signUpUser,
  getFeed,
  
};
