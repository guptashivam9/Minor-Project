const { Router } = require("express");
const {  loginUser, signUpUser, getFeed } = require("../controllers/user");
//const {  createPost, getPosts } = require("../controllers/post");
const{ userprofile}   = require("../controllers/post");
const { sendEmail } = require("../controllers/sendEmail");
const{ verifyotp} = require("../controllers/otpverify");
const{sendRequest} = require("../controllers/sendRequest");

const router = Router();
const multer = require('multer');

// root path
router.get("/", (req, res) => {
  res.status(200).send({ status: "OK", message: "App is running" });
});

/*************** USER APIs begins ********************/
//router.get("/api/v1/users/", getUser);

// login api
router.post("/api/v1/login", loginUser);

router.post("/api/v1/signup", signUpUser);

router.get("/getfeed", getFeed);
// router.get("/getuser", getUser);

/*************** USER APIs ends ********************/

/*************** POST APIs begins ********************/

// read file and send content of file as response
//router.get("/api/v1/posts", getprofile);
router.post("/api/v1/post", userprofile);

router.post("/sendEmail", sendEmail);
router.post("/verifyotp", verifyotp);
router.post("/sendRequest", sendRequest);



   
module.exports = {
  router,
};

