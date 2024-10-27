const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id:Number,
  email:  { type: String, unique: true },
  username: String,
  password: String,
  fullname: String,
  fullName: String,
  dateOfBirth:{ type: Date, default: new Date() },
  Age:Number,
  religion: String,
  caste: String,
  qualifications: String,
  nationality: String,
  regionalAddress:  String,
  gender: String,
  image: String,
  //request: [Number],
});














const postSchema = new mongoose.Schema({
  fullName:  String,
  dateOfBirth:{ type: Date, default: new Date() },
  Age:Number,
  religion: String,
  caste: String,
  qualifications: String,
  nationality: String,
  regionalAddress:  String,
  gender: String,
  // photos: [String]

});

// const profileSchema = new mongoose.Schema({
//   fullName: { type: String, unique: true },
//   dateOfBirth:{ type: Date, default: new Date() },
//   religion: String,
//   caste: String,
//   qualifications: String,
//   nationality: String,
//   regionalAddress:  String,
//   gender: String,
//   photos: [String]
//});
module.exports = {
  userSchema,
  postSchema,
  //profileSchema
};
