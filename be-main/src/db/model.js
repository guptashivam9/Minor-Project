const mongoose = require("mongoose");

const { postSchema, userSchema /*,profileSchema*/} = require("./schema");

const User = mongoose.model("user", userSchema);
const Post = mongoose.model("post", postSchema);
//const Profile = mongoose.model("profile", profileSchema);
module.exports = {
  User,
  Post
  //Profile
};
